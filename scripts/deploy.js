const hre = require("hardhat");
require("dotenv").config();

console.log("PRIVATE_KEY loaded:", process.env.PRIVATE_KEY);

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const Fund = await hre.ethers.getContractFactory("HealthStakingFund");

  const contract = await Fund.deploy(
    "0x471EcE3750Da237f93B8E339c536989b8978a438", // CELO token
    "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1", // cUSD token
    "0xf229F3Dcea3D7cd3cA5ca41C4C50135D7b37F2b9"             // Replace this with your Gnosis Safe or treasury
  );

  // ✅ NEW SYNTAX FOR ETHERS v6+
  console.log("✅ Contract deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
