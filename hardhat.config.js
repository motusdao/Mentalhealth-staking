require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

console.log("PRIVATE_KEY loaded:", process.env.PRIVATE_KEY);


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    alfajores: {
      url: "https://rpc.ankr.com/celo_testnet",


      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
