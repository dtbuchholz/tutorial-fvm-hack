const hre = require("hardhat");
const { Database, Validator, helpers } = require("@tableland/sdk");

async function main() {
  const contractAddr = hre.userConfig.contract;
  const fvm = await ethers.getContractAt("FVM", contractAddr);
  const [signer] = await hre.ethers.getSigners();
  const chainId = await signer.getChainId();
  const db = new Database({
    baseUrl: helpers.getBaseUrl(1),
  });
  const validator = new Validator(db.config);
  const name = await validator.getTableById(21, 23);
  console.log(name);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
