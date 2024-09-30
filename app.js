const express = require("express");
const path = require("path");

const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello world!</h1>");
});

app.get("/restaurants", function (req, res) {
  const restaurantsFilePath = path.join(__dirname, "Views", "restaurants.html");
  res.sendFile(restaurantsFilePath);
});

app.get("/recommend", function (req, res) {
  const recommendFilePath = path.join(__dirname, "Views", "recommend.html");
  res.sendFile(recommendFilePath);
});

app.get("/about", function (req, res) {
  const aboutFilePath = path.join(__dirname, "Views", "about.html");
  res.sendFile(aboutFilePath);
});

app.get("/confirm", function (req, res) {
  const confirmFilePath = path.join(__dirname, "Views", "confirm.html");
  res.sendFile(confirmFilePath);
});

app.listen(3000);
