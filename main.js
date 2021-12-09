var Web3 = require("web3");
var http = require("http");
const abi = require("./abis/cryptoadz.json");
const { MerkleTree } = require("merkletreejs");
const { strictEqual } = require("assert");
const { Console } = require("console");

const infuraEndpoint = `https://mainnet.infura.io/v3/7fd81eb359ea4252ba1d7e7b675be37f`;
var web3 = new Web3(infuraEndpoint);
const cryptoadzAddress = `0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6`;

retrieveMetaData = (response) => {
  var str = "";

  //another chunk of data has been received, so append it to `str`
  response.on("data", function (chunk) {
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on("end", function () {
    const obj = JSON.parse(str);
    console.log(obj);
    toadzMetaData.push(obj);
  });

  response.on("error", function (err) {
    console.log(err);
  });
};

const cryptoadzContract = new web3.eth.Contract(abi, cryptoadzAddress);
const ownersBalances = [];
const onlyOwners = [];
const toadzMetaData = [];
const logOwners = async () => {
  const supply = await cryptoadzContract.methods.totalSupply().call();
  console.log(supply);

  // original tokens
  for (let i = 1; i <= 6969; i++) {
    var options = {
      host: "localhost",
      port: 8081,
      path: "/ipfs/QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/" + i,
    };
    const owner = await cryptoadzContract.methods.ownerOf(i).call();
    if (onlyOwners.includes(owner)) {
      const ownersIndex = onlyOwners.indexOf(owner);
      ownersBalances[ownersIndex].tokenIds.push(i);
    } else {
      onlyOwners.push(owner);
      ownersBalances.push({ owner: owner, tokenIds: [i] });
    }
    console.log("adding metadata");
    http.request(options, retrieveMetaData).end();
  }

  // honorary members
  for (let i = 1000000; i <= 56000000; i += 1000000) {
    var options = {
      host: "localhost",
      port: 8081,
      path: "/ipfs/QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/" + i,
    };
    const owner = await cryptoadzContract.methods.ownerOf(i).call();
    if (onlyOwners.includes(owner)) {
      const ownersIndex = onlyOwners.indexOf(owner);
      ownersBalances[ownersIndex].tokenIds.push(i);
    } else {
      onlyOwners.push(owner);
      ownersBalances.push({ owner: owner, tokenIds: [i] });
    }
    console.log("adding metadata");
    http.request(options, retrieveMetaData).end();
  }

  const fs = require("fs");
  // cryptoadz owners
  fs.writeFile(
    "cryptoadz-ownerz-snapshot.json",
    JSON.stringify(onlyOwners),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );

  // // cryptoadz ownerz balances
  fs.writeFile(
    "cryptoadz-ownerz-balances-snapshot.json",
    JSON.stringify(onlyOwners),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );

  // cryptoadz metadata
  fs.writeFile(
    "cryptoadz-metadata.json",
    JSON.stringify(toadzMetaData),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );

  console.log("array length " + ownersBalances.length);
};

logOwners();
