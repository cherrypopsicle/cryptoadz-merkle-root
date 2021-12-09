var Web3 = require("web3");
const abi = require("./abis/cryptoadz.json");
const { MerkleTree } = require("merkletreejs");
// const keccak256 = require("keccak256");
const IPFS = require('ipfs-core');
// set provider
const infuraEndpoint = `https://mainnet.infura.io/v3/7fd81eb359ea4252ba1d7e7b675be37f`;
var web3 = new Web3(infuraEndpoint);
const cryptoadzAddress = `0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6`;
const ipfsURI = `QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/`;

const cryptoadzContract = new web3.eth.Contract(abi, cryptoadzAddress);
const ownersBalances = [];
const onlyOwners = [];
const toadzMetaData = [];
const logOwners = async () => {
  const ipfs = await IPFS.create()
  const supply = await cryptoadzContract.methods.totalSupply().call();
  console.log(supply);
  for (let i = 1; i <= 10; i++) {
    const owner = await cryptoadzContract.methods.ownerOf(i).call();
    if (onlyOwners.includes(owner)) {
      const ownersIndex = onlyOwners.indexOf(owner);
      ownersBalances[ownersIndex].tokenIds.push(i);
    } else {
      onlyOwners.push(owner);
      ownersBalances.push({ owner: owner, tokenIds: [i] });
      const metadata = await ipfs.object.get(`QmdxWocbtAV7uCTAQtJuTCgELWCM7anAZxmLgzQaptFAc1`);
      console.log(metadata);
    }
  }
  const fs = require("fs");
  fs.writeFile(
    "cryptoadz-ownerz-snapshot.json",
    JSON.stringify(ownersBalances),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );
  fs.writeFile(
    "cryptoadz-ownerz-balances-snapshot.json",
    JSON.stringify(onlyOwners),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );
  console.log("array length " + ownersBalances.length);
  // const leaves = owners.map((x) => SHA256(x));
  // const tree = new MerkleTree(leaves, SHA256);
  // const root = tree.getRoot().toString("hex");
  // console.log(root);
  // const leaf = SHA256("0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17");
  // const proof = tree.getProof(leaf);
  // console.log(proof);
};

logOwners();
