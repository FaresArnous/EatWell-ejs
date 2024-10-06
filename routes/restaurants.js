const express = require("express");

const uuid = require("uuid");

const resData = require("../util/resturant-data");
const { restart } = require("nodemon");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  const restaurantId = req.params.id;
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  const storedResturant = resData.getStoredRes();

  storedResturant.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestarents: storedResturant.length,
    restaurants: storedResturant,
    nextOrder,
  });
});
//Dynamic Route
router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const storedResturant = resData.getStoredRes();

  for (const rertaurant of storedResturant) {
    if (rertaurant.id === restaurantId) {
      return res.render("restaurants-details", { restaurant: rertaurant });
    }
  }

  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const storedResturant = resData.getStoredRes();
  storedResturant.push(restaurant);

  resData.storedResturant(storedResturant);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
