const fs = require("fs");
const path = require("path");

const DataFilePath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRes() {
  const fileData = fs.readFileSync(DataFilePath);

  const storedResturant = JSON.parse(fileData);

  return storedResturant; // we use return to make the code accessable outside this function
}

function storedResturant(storablRes) {
  fs.writeFileSync(DataFilePath, JSON.stringify(storablRes));
}

module.exports = {
  getStoredRes: getStoredRes, //the firs name is the keyname which we can use in other files
  //the second naame is what we are pointing at.
  storedResturant: storedResturant,
};
