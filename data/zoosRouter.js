const router = require("express").Router();

// START KNEX config 
const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(config);

// END KNEX config


// START Endpoints

// Lists all the zoos in the database -- GET /api/zoos

// Returns one zoo with a specific ID -- GET /api/zoos/:id

// Adds a new zoo to the database -- POST /api/zoos

// Reports the number of updated zoos -- PUT /api/zoos/:id

// Reports the number of deleted zoos -- DELETE /api/zoos/:id

module.exports = router;
