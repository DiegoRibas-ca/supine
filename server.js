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

// app.get("/order", (req, res) => {
//   res.render("urls/landing-page");
// });


app.post("/order", (req, res) => {

  //REQUEST THE BODY

  let body = req.body;
  //console.log("body", body);
  //console.log("phone", body.user_phone);

  //MAKE PROMISES AND INSERT TABLES

    // Deletes ALL existing entries\
  let order;
    // let items;

          // Inserts seed entries
  knex('table_order').insert({ user_name: body.user_name, user_phone: body.user_phone }).returning('id')
      // ])
    .then(data => {
      order = data[0];
      return Promise.all([
        knex('items_order').insert({ order_id: order, item_id: 79, quantity: body.Hamburger }),
        knex('items_order').insert({ order_id: order, item_id: 80, quantity: body.Sushi }),
        knex('items_order').insert({ order_id: order, item_id: 81, quantity: body.Coke }),
        knex('items_order').insert({ order_id: order, item_id: 82, quantity: body.Orange_Juice }),

    ]).then(data => {
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
        console.log(message.sid));
        res.status(200).json({
          // Thanks
          name: body.user_name,
          // your order has been sent.
          Hamburgers: body.Hamburger,
          Sushi: body.Sushi,
          Cokes: body.Coke,
          Orange_Juice: body.Orange_Juice,
          Phone: body.user_phone
          // you will soon receive a confirmation SMS from the restaurant
        });
      })
  })


  // res.render("urls/order-page", templateVars);

});



// restaurant sends message to client
app.post("/restaurant", (req, res) => {

  let phone;
  let body = req.body;
  let orderid = body.formid;
  //console.log("body", body)

  knex('table_order').where('id', orderid).returning('user_phone')

   .then(data => {
    phone = data[0].user_phone
    console.log("phone", phone)
      client.messages.create({
        body:`-
          ${body.restaurant} is working
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
        //console.log(message.sid));
  res.status(200).send("Confirmation has been sent to customer!"));
      })
  })


  // res.render("urls/order-page", templateVars);




// app.get("/order", (req, res) => {
//   res.render("urls/order-page");
// });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
