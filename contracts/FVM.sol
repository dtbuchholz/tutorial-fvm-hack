// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@tableland/evm/contracts/TablelandController.sol";
import "@tableland/evm/contracts/TablelandPolicy.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract FVM is TablelandController, ERC721Holder {
  uint256 public tableId;
  string private constant _TABLE_PREFIX = "fvm_table";

  // Add a constructor that creates and inserts data
  constructor() {
    tableId = TablelandDeployments.get().create(
      address(this),
      SQLHelpers.toCreateFromSchema(
        "id integer primary key," // Notice the trailing comma
        "val text",
        _TABLE_PREFIX
      )
    );

    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toInsert(
        _TABLE_PREFIX,
        tableId,
        "id,val",
        string.concat(
          Strings.toString(1), // Convert to a string
          ",",
          SQLHelpers.quote("Bobby Tables") // Wrap strings in single quotes with the `quote` method
        )
      )
    );
  }

  function tableName() external view returns (string memory) {
    return SQLHelpers.toNameFromId(_TABLE_PREFIX, tableId);
  }

  function setController() public {
    TablelandDeployments.get().setController(
      address(this),
      tableId,
      address(this) // Set the controller address
    );
  }

  function getPolicy(
    address,
    uint256
  ) public payable override returns (TablelandPolicy memory) {
    // Restrict updates to a single column
    string[] memory updatableColumns = new string[](1);
    updatableColumns[0] = "val";
    // Return the policy
    return
      TablelandPolicy({
        allowInsert: true,
        allowUpdate: true,
        allowDelete: false,
        whereClause: "id > 1",
        withCheck: "",
        updatableColumns: updatableColumns
      });
  }
}