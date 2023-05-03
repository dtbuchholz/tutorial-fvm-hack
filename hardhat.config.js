require("@nomicfoundation/hardhat-toolbox");
require("@tableland/hardhat");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  localTableland: {
    silent: false,
    verbose: false,
  },
  networks: {
    "filecoin-hyperspace": {
      url: "https://rpc.ankr.com/filecoin_testnet", // No API auth needed.
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  contract: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
};
