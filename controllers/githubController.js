const { getGitHubProfile } = require("../services/githubService");
const db = require("../database/db");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await getGitHubProfile(username);

    const sql = `
      INSERT INTO profiles
      (
        username,
        github_id,
        name,
        bio,
        company,
        location,
        public_repos,
        followers,
        following,
        public_gists,
        profile_url,
        avatar_url,
        account_created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        github_id = VALUES(github_id),
        name = VALUES(name),
        bio = VALUES(bio),
        company = VALUES(company),
        location = VALUES(location),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        public_gists = VALUES(public_gists),
        profile_url = VALUES(profile_url),
        avatar_url = VALUES(avatar_url),
        account_created_at = VALUES(account_created_at)
    `;

    db.query(
      sql,
      [
        profile.login,
        profile.id,
        profile.name,
        profile.bio,
        profile.company,
        profile.location,
        profile.public_repos,
        profile.followers,
        profile.following,
        profile.public_gists,
        profile.html_url,
        profile.avatar_url,
        new Date(profile.created_at)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
      ],
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message
          });
        }

        res.json({
          success: true,
          message: "Profile analyzed and stored successfully",
          username: profile.login
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch GitHub profile"
    });
  }
};

const getAllProfiles = (req, res) => {
  const sql = "SELECT * FROM profiles";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  });
};
const getProfileByUsername = (req, res) => {
  const { username } = req.params;

  const sql = "SELECT * FROM profiles WHERE username = ?";

  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.json({
      success: true,
      data: results[0]
    });
  });
};
const getStats = (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS totalProfiles,
      SUM(followers) AS totalFollowers,
      AVG(public_repos) AS averageRepos
    FROM profiles
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      data: results[0]
    });
  });
};
module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
  getStats
};