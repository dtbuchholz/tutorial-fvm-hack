const hre = require("hardhat");
const { Database, helpers } = require("@tableland/sdk");

async function main() {
  const contractAddr = hre.userConfig.contract;
  const fvm = await ethers.getContractAt("FVM", contractAddr);
  const [signer] = await hre.ethers.getSigners();
  const chainId = await signer.getChainId();
  const db = new Database({
    signer,
    baseUrl: helpers.getBaseUrl(chainId),
  });
  const name = await fvm.tableName();
  const { meta: write } = await db
    // .prepare(`UPDATE ${name} SET val = ? where id = 1`)
    .prepare(`INSERT INTO ${name}(val) VALUES (?)`)
    .bind("My value") // Some random user input for the `val` column.
    .run();
  await write.txn.wait();
  console.log(`Wrote data using address '${signer.address}'`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
