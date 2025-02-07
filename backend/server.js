const express = require("express");
const cors = require("cors");

require("dotenv").config();

const scoreRoutes = require("./routes/score");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", scoreRoutes);

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
