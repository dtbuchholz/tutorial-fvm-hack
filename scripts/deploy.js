const hre = require("hardhat");

async function main() {
  const FVM = await hre.ethers.getContractFactory("FVM");
  const fvm = await FVM.deploy();

  await fvm.deployed();
  console.log(
    `Contract deployed to '${fvm.address}'.\n^Save this in 'hardhat.config.js'.`
  );

  const tableId = await fvm.tableId();
  console.log(`Table ID '${tableId}' minted to contract.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
