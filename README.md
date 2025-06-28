# Task Manager Backend API

This is a functional full-stack backend built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **JWT authentication**. 

Made under a time limit of 2 hours.

I struggled to recall how to do a lot of this, and I went over the time limit because of that. Given the circumstances, I decided to at least present a functional backend.

## 📌 Summary

This backend includes:

- ✅ User registration & login
- ✅ JWT-based auth with protected routes
- ✅ Task CRUD endpoints tied to the authenticated user
- ✅ Modular code (controllers, models, routes, middleware)
- ✅ PostgreSQL integration via the `pg` library

## ⚙️ Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **PostgreSQL** (set up via pgAdmin manually)
- **JWT** for auth
- **Bcrypt** for password hashing

## ⚠️ Notes

- **Database**: The `users` and `tasks` tables were created manually in **pgAdmin**. No `.sql` file is included, but structure can be inferred from the code.
- **Environment Variables**: A `.env` file is used to store the PostgreSQL connection string and JWT secret (not included for security).
- **Error Handling**: Due to time constraints, only basic error handling is in place.

## 🔐 Protected Routes

All `/api/tasks` routes and the `/api/auth/profile` route are protected via JWT. Access requires a valid token in the `Authorization` header.

## 🛠️ Setup

1. Install dependencies:

   ```bash
   npm install

2. Create a .env file in the root directory, using .env.example as a guide

3. Start the server

   ```bash
   npm run dev
