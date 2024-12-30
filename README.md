- [x] User Authentication: Users should be able to register and log in to the system
- [x] Admins should be able to CRUD different users
- [x] Game Submission: Admins should be able to CRUD different games
- [x] Score Submission: Users should be able to CRUD their scores for different games or activities
- [x] Leaderboard Updates: Display a global leaderboard showing the top users across all games
- [x] User Rankings: Users should be able to view their rankings on the leaderboard
- [x] Top Players Report: Generate reports on the top players for a specific period
# 🏆 Live Leaderboard

A real-time leaderboard system built using **Node.js**, **TypeScript**, **Express**, **Redis**, and **Prisma**. This project leverages caching and cron jobs for real-time leaderboard updates and efficient management.

---

## ✨ Features

- **User Authentication:** Secure user authentication system.
- **Efficient Updates:** Caching mechanism to refresh leaderboard upon score submission.
- **Automated Maintenance:** Cron jobs for periodic updates and cleanup.
- **High Performance:** Utilizes Redis sorted sets for efficient score management and retrieval.
- **Scalable:** Designed for high scalability and fast response times.
- **Simple API:** Easy-to-use RESTful API for interacting with the leaderboard.

---

## 🛠️ Technologies Used

- **Node.js**: Backend runtime.
- **TypeScript**: Strongly typed programming language for better development experience.
- **Express**: Minimalist web framework.
- **Prisma**: ORM for database management.
- **Redis**: In-memory data store for sorted sets and caching.
- **Cron Jobs**: For scheduled leaderboard maintenance.

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js (v16 or above)
- Redis (latest version)
- PostgreSQL (or any supported database for Prisma)

### 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FreyGold/Live-Leaderboard.git
   cd Live-Leaderboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=
   DATABASE_URL=
   JWT_SECRET=
   ```

4. Set up the database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

---

## 🌐 API Endpoints

### User Management

- **POST** `/register`
  - Register a new user.
- **POST** `/login`
  - Authenticate a user and return a JWT.
- **GET** `/user/:id`
  - Retrieve user details by their ID.
- **PATCH** `/user/:id`
  - Update user information by ID.

### Score Management

- **GET** `/score/:id`
  - Retrieve a score by its ID.
- **POST** `/score`
  - Submit a new score.
- **DELETE** `/score/:id`
  - Remove a score by ID.
- **PATCH** `/score/:id`
  - Update a score by ID.
- **GET** `/scores`
  - Retrieve all scores.

### Game Management

- **GET** `/game/:id`
  - Retrieve a game by its ID.
- **POST** `/game`
  - Add a new game.
- **DELETE** `/game/:id`
  - Remove a game by ID.
- **PATCH** `/game/:id`
  - Update game information by ID.
- **GET** `/games`
  - Retrieve all games.

### Leaderboard Management

- **GET** `/leaderboard/top`
  - Fetch the top players on the leaderboard.
- **GET** `/leaderboard/rank/:playerId`
  - Get the rank of a player by their ID.

### Maintenance

- **GET** `/flush`
  - Flush the cache, the leaderboard will then be generated again by the cron job

---

## 🧪 Development Scripts

- **Start in Development Mode:**
  ```bash
  npm run dev
  ```
- **Build for Production:**
  ```bash
  npm run build
  ```
- **Run Tests:**
  ```bash
  npm run test
  ```

---

## 🚀 Future Improvements

- Implement pagination for large leaderboards.
- Introduce roles and permissions for admins.
- Enhance caching and cron job configurations for better performance.
- Persist the leaderboard in the database to reduce computing task of calculating everything from zero on the server with the user base increasing

---

##

