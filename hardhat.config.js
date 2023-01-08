require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");
// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = process.env.KEY;
// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = `${process.env.PRIVATEKEY}`;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/xYP4WY-ctaScl5bpXR_L1oDBLcyrWrkz",
      accounts: ["0x598cc92bdcbfcea2473019fc46f0619e14bd66dd5076ec95778258861b187851"]
    }
  }
};

