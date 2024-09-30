const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  const indexFilePath = path.join(__dirname, "Views", "index.html");
  res.sendFile(indexFilePath);
});

app.get("/restaurants", function (req, res) {
  const restaurantsFilePath = path.join(__dirname, "Views", "restaurants.html");
  res.sendFile(restaurantsFilePath);
});

app.get("/recommend", function (req, res) {
  const recommendFilePath = path.join(__dirname, "Views", "recommend.html");
  res.sendFile(recommendFilePath);
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const DataFilePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(DataFilePath);

  const storedResturant = JSON.parse(fileData);

  storedResturant.push(restaurant);

  fs.writeFileSync(DataFilePath, JSON.stringify(storedResturant));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  const confirmFilePath = path.join(__dirname, "Views", "confirm.html");
  res.sendFile(confirmFilePath);
});

app.get("/about", function (req, res) {
  const aboutFilePath = path.join(__dirname, "Views", "about.html");
  res.sendFile(aboutFilePath);
});

app.listen(3000);
