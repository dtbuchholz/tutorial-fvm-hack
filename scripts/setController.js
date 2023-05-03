const hre = require("hardhat");

async function main() {
  const contractAddr = hre.userConfig.contract;
  const fvm = await ethers.getContractAt("FVM", contractAddr);
  await fvm.setController();
  console.log("New controller set.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
