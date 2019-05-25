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
router.get("/", async (req, res) => {
  try {
    const zoos = await db("zoos");
    res.status(200).json(zoos);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error getting zoos. Is the server online?" });
  }
});

// Returns one zoo with a specific ID -- GET /api/zoos/:id

// Adds a new zoo to the database -- POST /api/zoos

// Reports the number of updated zoos -- PUT /api/zoos/:id

// Reports the number of deleted zoos -- DELETE /api/zoos/:id

module.exports = router;
