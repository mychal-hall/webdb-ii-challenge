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
router.get("/:id", async (req, res) => {
  try {
    const zoo = await db("zoos")
      .where({ id: req.params.id })
      .first();
    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res
        .status(404)
        .json({ message: "No dice. No zoo is in existence with that ID" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error getting the zoo. Is the server online?" });
  }
});

// Adds a new zoo to the database and returns the ID of the new zoo -- POST /api/zoos
router.post("/", (req, res) => {
  db("zoos")
    .insert(req.body, "id")
    .then(ids => {
      db("zoos")
        .where({ id: ids[0] })
        .first()
        .then(zoo => {
          res.status(201).json(zoo.id);
        })
        .catch(error => {
          console.log(error);
          res
            .status(500)
            .json({ message: "Error creating a new zoo. That's not ideal." });
        });
    });
});

// Reports the number of updated zoos -- PUT /api/zoos/:id
router.delete("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({ message: "No dice. Can not delete what isn't real." });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({
          message: "Error deleting the zoo. You can't just erase animals."
        });
    });
});

// Reports the number of deleted zoos -- DELETE /api/zoos/:id



module.exports = router;
