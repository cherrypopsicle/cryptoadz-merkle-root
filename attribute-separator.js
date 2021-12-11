const metadata = require("./cryptoadz-metadata.json");
const traitTypes = [];

// all the different traits types
const background = [];
const body = [];
const head = [];
const accessory2 = [];
const numberTraits = [];
const eyes = [];
const mouth = [];
const accesoryI = [];
const clothes = [];
const custom = [];
const name = [];

let value = 0;
console.log(metadata.length);

const getTraitValues = (traits, traitType, array) => {
  if (traits.filter((e) => e.trait_type === traitType).length > 0) {
    traits.filter((e) => {
      if (e.trait_type === traitType) {
        if (array.includes(e.value)) {
          console.log("already added");
        } else {
          array.push(e.value);
        }
        console.log(array);
      }
    });
    /* vendors contains the element we're looking for */
  }
};

const writeFile = (fileName, array) => {
  const fs = require("fs");
  fs.writeFile(fileName, JSON.stringify(array), (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
};


for (let i = 0; i < metadata.length; i++) {
  const traits = metadata[i].attributes;
  getTraitValues(traits, "Name", name);
}
writeFile("name.json", name);