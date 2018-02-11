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
const accountSid = 'AC12b2a9688196e05e1e204fb2f0a0eaab'; // Your Account SID from www.twilio.com/console
const authToken = secrets.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);



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
  res.render("urls/menu-page");
});

app.get("/restaurant", (req, res) => {
  res.render("urls/restaurant");
});

// POST request to /order
app.post("/order", (req, res) => {

  let body = req.body;

    // Deletes ALL existing entries\
  let order;


// find item id numbers using knex
  let hamburgerID = knex('table_items').select('id').where({item: 'Hamburguer'});
  let sushiID = knex('table_items').select('id').where('item', 'Sushi');
  let cokeID = knex('table_items').select('id').where('item', 'Coke');
  let orJuiceID = knex('table_items').select('id').where('item', 'Orange Juice');

// insert this new order into table_order requiring the user name and user phone
  knex('table_order').insert({ user_name: body.user_name, user_phone: body.user_phone }).returning('id')
      //return the table_order id
    .then(data => {
      order = data[0];
      return Promise.all([
        //insert order items into items_order table using returned id from above
        knex('items_order').insert({ order_id: order, item_id: hamburgerID, quantity: body.Hamburger }),
        knex('items_order').insert({ order_id: order, item_id: sushiID, quantity: body.Sushi }),
        knex('items_order').insert({ order_id: order, item_id: cokeID, quantity: body.Coke }),
        knex('items_order').insert({ order_id: order, item_id: orJuiceID, quantity: body.Orange_Juice }),

    ]).then(data => {
      // build the SMS message that will be sent to the restaurant
      client.messages.create({
        body:`-
          New Order
          From ${body.user_name};
          Order Id: ${order},
          Hamburgers: ${body.Hamburger},
          Sushi: ${body.Sushi},
          Coke: ${body.Coke},
          Orange Juice: ${body.Orange_Juice}
          end of order`,
        to: `+1${body.user_phone}`,  // Text this number
        from: '+12892174594', // From a valid Twilio number
      })
      .then((message) =>
        // retun 200 status and send with it the json of the order details to render
        //the order confirmation page
        console.log(message.sid));  // lets you see a confirmation of sent SMS
        res.status(200).json({
          name: body.user_name,
          Hamburgers: body.Hamburger,
          Sushi: body.Sushi,
          Cokes: body.Coke,
          Orange_Juice: body.Orange_Juice,
          Phone: body.user_phone,
          Total: body.total_price
        });
      })
  })

});



// restaurant sends message to client
app.post("/restaurant", (req, res) => {

  let phone;
  let body = req.body;
  let orderid = body.formid;

// find the client phone number from database table_order using the order id
  knex('table_order').where('id', orderid).returning('user_phone')

   .then(data => {
    // create message to client
    phone = data[0].user_phone
    //console.log("phone", phone)
      client.messages.create({
      body:`-
      ${body.restaurant}
       is working
       on your order!
       Estimated time is
       ${body.time} minutes.
       ${body.restaurant}
       says,
       ${body.message}
          `,
        to: `+1${phone}`,  // Text this number
        from: '+12892174594', // From a valid Twilio number
      })
      .then((message) =>
        console.log(message.sid)); // log to confirm message has been sent
  res.status(200).send("Confirmation has been sent to customer!");
      })
  })


app.get("/payment", (req, res) => {
  console.log("paymeny req", req.body)
  res.render("urls/payment");
});


// Customer payment POST
app.post("/payment", (req, res) => {
console.log("Pay", req.body);
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_bRuMVEUiHWq55yX3W7DUkZJo");
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken; // Using Express

  // Charge the user's card:
  stripe.charges.create({
      amount: 999,
      currency: "cad",
      description: "Example charge",
      source: token,
     }, function(err, charge) {
      // asynchronously called
      res.redirect("/");
      res.send()
   });



});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
