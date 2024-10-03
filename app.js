const express = require("express");
const path = require("path");
const fs = require("fs");

const uuid = require("uuid");
const { restart } = require("nodemon");

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
//Dynamic Route
app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const DataFilePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(DataFilePath);

  const storedResturant = JSON.parse(fileData);

  for (const rertaurant of storedResturant) {
    if (rertaurant.id === restaurantId) {
      return res.render("restaurants-details", { restaurant: rertaurant });
    }
  }

  res.status(404).render("404");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
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

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
