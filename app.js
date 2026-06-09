require("dotenv").config();

const express = require("express");
const db = require("./database/db");
const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(express.json());
app.use("/api", githubRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "GitHub Profile Analyzer API Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});