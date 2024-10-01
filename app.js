const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const DataFilePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(DataFilePath);

  const storedResturant = JSON.parse(fileData);
  res.render("restaurants", {
    numberOfRestarents: storedResturant.length,
    restaurants: storedResturant,
  });
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
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
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000);
