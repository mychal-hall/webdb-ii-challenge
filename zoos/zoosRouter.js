const express = require("express");

const Zoos = require("./zoosDb.js");

const router = express.Router();

// START Endpoints

// Lists all the zoos in the database -- GET /api/zoos
router.get("/", async (req, res) => {
  try {
    const zoos = await Zoos.get();
    res.status(200).json(zoos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding any zoos!" });
  }
});

// Returns one zoo with a specific ID -- GET /api/zoos/:id
router.get("/:id", validateZooId, async (req, res) => {
  res.status(200).json(req.zoo);
});

// Adds a new zoo to the database and returns the ID of the new zoo -- POST /api/zoos
router.post("/", validateZoo, async (req, res) => {
  try {
    const zoo = await Zoos.insert(req.body);
    res.status(201).json(zoo.id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating a new zoo!" });
  }
});

// Updates a zoo. Reports the number of updated zoos -- PUT /api/zoos/:id
router.put("/:id", validateZooId, async (req, res) => {
  try {
    const zoo = await Zoos.update(req.params.id, req.body);
    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: "No zoo with that ID exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the zoo" });
  }
});

// Deletes the requested zoo. Reports the number of deleted zoos -- DELETE /api/zoos/:id
router.delete("/:id", validateZooId, async (req, res) => {
  try {
    const count = await Zoos.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The zoo is gone." });
    } else {
      res.status(404).json({ message: "No zoo exists with that ID" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error deleting the zoo... is the server up?" });
  }
});

// Custom Middleware

async function validateZooId(req, res, next) {
  try {
    const { id } = req.params;
    const zoo = await Zoos.getById(id);
    if (zoo) {
      req.zoo = zoo;
      next();
    } else {
      res.status(404).json({ message: "No zoo exists with that ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Critical Error. Is the server online?" });
  }
}

function validateZoo(req, res, next) {
  if (req.body && Object.keys(req.body).length) {
    if (req.body.name !== "") {
      next();
    } else {
      res.status(400).json({ message: "Please name the zoo." });
    }
  } else {
    res.status(500).json({ message: "The zoo is missing information!!!" });
  }
}

module.exports = router;
