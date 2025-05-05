const { ethers } = require("hardhat");

const STAKING_CONTRACT_ADDRESS = "0x4afea607fc9545c56449082fcbb4587ea0e4d45c";
const CUSD_TOKEN_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const USER_ADDRESS = "0x64608C2d5E4685830348e9155bAB423bf905E9c9"; // <-- replace with your address
const AMOUNT = ethers.parseUnits(".01", 18); // <-- replace "1" with the amount you tried to stake
const DURATION = 30 * 24 * 60 * 60; // 30 days in seconds

const STAKING_ABI = [
  "function stakeCUSD(uint256 amount, uint256 duration) external",
];

async function main() {
  const [signer] = await ethers.getSigners();
  const staking = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, signer);

  try {
    // Simulate the call
    await staking.callStatic.stakeCUSD(AMOUNT, DURATION, { from: USER_ADDRESS });
    console.log("Simulation succeeded: No revert, transaction should work.");
  } catch (error) {
    console.error("Simulation failed! Error details:");
    console.error(error);
  }
}

main();