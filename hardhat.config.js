require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    holesky: {
      url: "https://rpc.ankr.com/eth_holesky",
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Securely load private key
    },
  },
};
