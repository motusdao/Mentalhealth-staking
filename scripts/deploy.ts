import hre from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Celo Alfajores addresses
  const CELO_TOKEN_ADDRESS = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"; // CELO token on Alfajores
  const CUSD_TOKEN_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // cUSD token on Alfajores
  const TREASURY_ADDRESS = "0xf229F3Dcea3D7cd3cA5ca41C4C50135D7b37F2b9"; // Your treasury address

  console.log("Deploying HealthStakingFund contract...");

  const HealthStakingFund = await hre.ethers.getContractFactory("HealthStakingFund");
  const stakingFund = await HealthStakingFund.deploy(
    CELO_TOKEN_ADDRESS,
    CUSD_TOKEN_ADDRESS,
    TREASURY_ADDRESS
  );

  await stakingFund.deployed();

  console.log("HealthStakingFund deployed to:", stakingFund.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 