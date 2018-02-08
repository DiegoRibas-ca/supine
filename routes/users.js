"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("price")
      .from("table_items")
      .where("id",48)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}


