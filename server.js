const express = require("express");
const cors = require("cors");

require("dotenv").config();

const scoreRoutes = require("./routes/score");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("🎾 API Tennis Backend is running!");
  });
  

app.use("/api", scoreRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
