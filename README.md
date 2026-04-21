# Task Management API

This is a backend API for a simple task management application.  
It allows users to register, log in, and manage their own tasks securely.



## Tech Stack

- Node.js
- Express.js
- PostgreSQL (for user data)
- MongoDB (for tasks)
- JWT (for authentication)



## Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes (only logged-in users can access)
- Create, read, update, delete tasks
- Each user can only access their own tasks
- Basic validation and error handling


## Setup Instructions

### 1. Clone the repository

```bash
git clone <https://github.com/KavyaOberai16/task-management-api>
cd task-management-api
2. Install dependencies
npm install
3. Create .env file

Add the following variables:

PORT=5000
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection
PG_URI=your_postgresql_connection
4. Run the server
npm run dev

Server will start on:

http://localhost:5000
API Endpoints
Auth Routes
POST /api/auth/register → Register user
POST /api/auth/login → Login user
Task Routes (Protected)
POST /api/tasks → Create task
GET /api/tasks → Get all tasks
GET /api/tasks/:id → Get single task
PUT /api/tasks/:id → Update task
DELETE /api/tasks/:id → Delete task
Authentication

After login, a JWT token is returned.
This token must be sent in headers for protected routes:

Authorization: Bearer <token>

Design Decisions
PostgreSQL is used for users because it handles structured data and relationships well.
MongoDB is used for tasks because it allows flexible schema and faster iteration.
JWT is used to keep authentication stateless.
Middleware is used to protect routes and ensure users can only access their own data.

