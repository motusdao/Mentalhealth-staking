const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Testing with account:", signer.address);

  const STAKING_CONTRACT_ADDRESS = "0x4afea607fc9545c56449082fcbb4587ea0e4d45c";

  // Get contract instance
  const stakingFund = await hre.ethers.getContractAt("HealthStakingFund", STAKING_CONTRACT_ADDRESS);
  
  // Try to get total staked amount
  try {
    const totalStaked = await stakingFund.getTotalStaked();
    console.log("Total Staked:", hre.ethers.formatEther(totalStaked));
  } catch (error) {
    console.error("Error accessing contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 