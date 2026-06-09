# GitHub Profile Analyzer API

A Node.js and Express.js backend application that analyzes GitHub user profiles using the GitHub Public API and stores profile insights in a MySQL database.

## Features

- Analyze GitHub profiles using username
- Fetch data from GitHub Public API
- Store profile insights in MySQL
- Retrieve all analyzed profiles
- Retrieve a specific profile by username
- Profile update support
- Statistics endpoint for profile analytics

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub Public API
## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to the project folder

```bash
cd github-profile-analyzer
```

3. Install dependencies

```bash
npm install
```

4. Create a .env file in the root directory and add:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_profile_analyzer
```

5. Start the server

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```
## API Endpoints

### Analyze GitHub Profile

```http
GET /api/github/analyze/:username
```

Example:

```http
GET /api/github/analyze/octocat
```

### Get All Profiles

```http
GET /api/profiles
```

### Get Single Profile

```http
GET /api/profiles/:username
```

Example:

```http
GET /api/profiles/octocat
```

### Get Statistics

```http
GET /api/stats
```

Returns:

```json
{
  "success": true,
  "data": {
    "totalProfiles": 2,
    "totalFollowers": 329139,
    "averageRepos": 10
  }
}
```
## Database Schema

Table: profiles

| Column | Description |
|----------|-------------|
| id | Primary Key |
| username | GitHub Username |
| github_id | GitHub User ID |
| name | GitHub Name |
| bio | User Bio |
| company | Company |
| location | Location |
| public_repos | Public Repository Count |
| followers | Followers Count |
| following | Following Count |
| public_gists | Public Gists Count |
| profile_url | GitHub Profile URL |
| avatar_url | Avatar URL |
| account_created_at | GitHub Account Creation Date |
| analyzed_at | Analysis Timestamp |

Database export file is included in the repository.
## Project Structure

```text
github-profile-analyzer
│
├── controllers
│   └── githubController.js
│
├── database
│   └── db.js
│
├── routes
│   └── githubRoutes.js
│
├── services
│   └── githubService.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
├── README.md
└── Dump20260608.sql
```
## Future Improvements

- Store repository language statistics
- Analyze top repositories
- Add pagination for profile listing
- Add authentication and user management
- Add caching for GitHub API responses
- Create a frontend dashboard for visualization

## Author

Name: Preksha Chidarla

GitHub: https://github.com/PrekshaChidarla

Email: chidharlapreksha@gmail.com