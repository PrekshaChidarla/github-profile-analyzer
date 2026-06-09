const express = require("express");

const router = express.Router();

const {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
  getStats
} = require("../controllers/githubController");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "GitHub Routes Working"
  });
});

router.get("/github/analyze/:username", analyzeProfile);

router.get("/profiles", getAllProfiles);

router.get("/profiles/:username", getProfileByUsername);

router.get("/stats", getStats);

module.exports = router;