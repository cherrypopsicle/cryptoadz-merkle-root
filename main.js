var Web3 = require("web3");
const abi = require("./abis/cryptoadz.json");
const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");

// set provider
const infuraEndpoint = `https://mainnet.infura.io/v3/7fd81eb359ea4252ba1d7e7b675be37f`;
var web3 = new Web3(infuraEndpoint);
const cryptoadzAddress = `0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6`;

const cryptoadzContract = new web3.eth.Contract(abi, cryptoadzAddress);
const owners = [];
const logOwners = async () => {
  const supply = await cryptoadzContract.methods.totalSupply().call();
  console.log(supply);
  for (let i = 1; i <= 6969; i++) {
    const owner = await cryptoadzContract.methods.ownerOf(i).call();
    console.log(owner);
    console.log(i);
    owners.push(owner);
  }
  const leaves = owners.map((x) => SHA256(x));
  const tree = new MerkleTree(leaves, SHA256);
  const root = tree.getRoot().toString("hex");
  const leaf = SHA256("0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17");
  const proof = tree.getProof(leaf);
  console.log(tree.verify(proof, leaf, root));
  console.log(tree.toString);
};

logOwners();
