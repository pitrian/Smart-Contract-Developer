const hre = require("hardhat");

async function main() {
  const CryptoBank = await hre.ethers.getContractFactory("CryptoBank");
  const cryptoBank = await CryptoBank.deploy();

  await cryptoBank.waitForDeployment();

  const address = await cryptoBank.getAddress();
  console.log("CryptoBank deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
