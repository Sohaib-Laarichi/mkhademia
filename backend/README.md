# Mkhedmin.ma Backend

Node.js + Express + MongoDB API for Mkhedmin.ma

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Copy `.env.example` to `.env` and set your MongoDB URI and JWT secret.

3. Start the server:
   ```bash
   npm run dev
   ```
   The API will run on `http://localhost:5000` by default.

## Scripts
- `npm run dev` — start with nodemon (dev)
- `npm start` — start with node (prod)

## Project Structure
- `src/index.js` — main entry point
- `src/models/` — Mongoose models

## Environment Variables
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — JWT secret for auth
- `PORT` — (optional) server port

## Health Check
GET `/api/health` → `{ status: 'ok' }` 