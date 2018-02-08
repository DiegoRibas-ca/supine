"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const secrets = require('./secrets');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("urls/landing-page");
});

app.get("/menu", (req, res) => {
  res.render("urls/landing-page");
});


app.get("/order", (req, res) => {
  res.render("urls/landing-page");
});


app.post("/order", (req, res) => {
  // let templateVars = req.body
  //body { Hamburger: '2', Sushi: '3', Coke: '6', 'Orange Juice': '2' }
  console.log("body", req.body)
  // res.render("urls/order-page", templateVars);

});

// app.get("/order", (req, res) => {
//   res.render("urls/order-page");
// });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
