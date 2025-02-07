const express = require("express");
const { calculateScore } = require("../controllers/scoreController");

const router = express.Router();

router.post("/calculate-score", (req, res) => {
  const { player1, player2, points } = req.body;

  if (!player1 || !player2 || !points) {
    return res.status(400).json({ error: "Données invalides !" });
  }

  const result = calculateScore(points, player1, player2);
  res.json(result);
});

module.exports = router;
