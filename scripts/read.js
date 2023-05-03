const hre = require("hardhat");
const { Database, Validator, helpers } = require("@tableland/sdk");

async function main() {
  const contractAddr = hre.userConfig.contract;
  const fvm = await ethers.getContractAt("FVM", contractAddr);
  const [signer] = await hre.ethers.getSigners();
  const chainId = await signer.getChainId();
  const tableId = await fvm.tableId();
  const db = new Database({
    baseUrl: helpers.getBaseUrl(chainId),
  });
  const validator = new Validator(db.config);
  const { name } = await validator.getTableById({ chainId, tableId });
  console.log(`Table '${name}' has the following data:`);
  const query = `SELECT * FROM ${name}`;
  const { results } = await db.prepare(query).all();
  console.log(JSON.stringify(results, null, 2));
  const encodeQuery = encodeURIComponent(query);
  console.log(
    `\nView this data here:\n${db.config.baseUrl}/query?statement=${encodeQuery}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
