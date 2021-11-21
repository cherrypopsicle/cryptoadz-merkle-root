const { MerkleTree } = require("merkletreejs");
const { ethers } = require("hardhat");
const keccak256 = require("keccak256");
const ownerz = require("./cryptoadz-ownerz-balances-snapshot.json");
console.log(ownerz.length);

const hashToken = (owner) => {
  return Buffer.from(
    ethers.utils.solidityKeccak256(["address"], [owner]).slice(2),
    "hex"
  );
};

const merkleTree = new MerkleTree(
  Object.entries(ownerz).map((token) => hashToken(...token)),
  keccak256
);

const root = merkleTree.getRoot().toString("hex");

for (const owner of Object.entries(ownerz)) {
  const proof = merkleTree.getProof(hashToken(owner));
  console.log(merkleTree.verify(proof, leaf, root));
}
