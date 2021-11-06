var Web3 = require("web3");
const abi = require("./abis/cryptoadz.json");

// set provider
const infuraEndpoint = `https://mainnet.infura.io/v3/7fd81eb359ea4252ba1d7e7b675be37f`;
var web3 = new Web3(infuraEndpoint);
const cryptoadzAddress = `0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6`;

const cryptoadzContract = new web3.eth.Contract(abi, cryptoadzAddress);

const logOwners = async () => {
  const supply = await cryptoadzContract.methods.totalSupply().call();
  console.log(supply);
  for (let i = 2; i < supply; i++) {
    const owner = await cryptoadzContract.methods.ownerOf(i).call();
    console.log(owner);
  }
};

logOwners();
