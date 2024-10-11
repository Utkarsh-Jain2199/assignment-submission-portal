# Assignment Submission Portal

This project is a backend system for an assignment submission portal. It allows users to register, upload assignments, and enables admins to review, accept, or reject those assignments. The backend is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Register and login for both users and admins.
- **Assignment Submission**: Users can upload assignments tagged to specific admins.
- **Assignment Review**: Admins can view, accept, or reject assignments.
- **Authentication**: JWT-based authentication for secure access.
- **Role-based Access Control**: Different capabilities for users and admins.

## Tech Stack

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Framework for routing and middleware.
- **MongoDB**: NoSQL database for storing users and assignments.
- **Mongoose**: MongoDB object modeling tool.
- **JWT**: For secure authentication.
- **bcryptjs**: For password hashing.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/assignment-submission-portal.git
   cd assignment-submission-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your MongoDB database. You can use a local MongoDB instance or a cloud provider like MongoDB Atlas.

4. Configure environment variables (see below).

5. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
PORT=3000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

- `PORT`: The port on which the server will run.
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT signing and verification.

## API Endpoints

### User Endpoints

- **POST /api/auth/register**
  - Register a new user or admin.
  - Body: `{ "username": "string", "password": "string", "role": "User | Admin" }`

- **POST /api/auth/login**
  - User/Admin login and receive JWT.
  - Body: `{ "username": "string", "password": "string" }`

- **POST /api/assignments/upload**
  - Upload an assignment (User only).
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ "task": "string", "admin": "string" }`

- **GET /api/assignments/admins**
  - List all admins (User only).
  - Headers: `Authorization: Bearer {token}`

### Admin Endpoints

- **GET /api/assignments/assignments**
  - View assignments tagged to the admin.
  - Headers: `Authorization: Bearer {token}`

- **POST /api/assignments/:id/accept**
  - Accept an assignment (Admin only).
  - Headers: `Authorization: Bearer {token}`

- **POST /api/assignments/:id/reject**
  - Reject an assignment (Admin only).
  - Headers: `Authorization: Bearer {token}`

## Usage

1. **Register** a user and an admin via the `/api/auth/register` endpoint.
2. **Login** to get a JWT token.
3. **Upload** an assignment as a user, and **review** the assignment as an admin.
4. **Accept** or **Reject** assignments as an admin.

### Example Requests

#### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username": "john", "password": "password123", "role": "User"}'
```

#### Login as User/Admin
```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username": "john", "password": "password123"}'
```

#### Upload an Assignment
```bash
curl -X POST http://localhost:3000/api/assignments/upload -H "Authorization: Bearer your_token" -H "Content-Type: application/json" -d '{"task": "Hello World", "admin": "admin_username"}'
```

## Project Structure

```
assignment-portal/
├── controllers/
│   ├── authController.js        # Handles authentication logic
│   ├── assignmentController.js   # Handles assignment operations
├── middleware/
│   ├── auth.js                  # JWT authentication middleware
│   ├── isAdmin.js               # Admin role-check middleware
├── models/
│   ├── User.js                  # User model definition
│   ├── Assignment.js            # Assignment model definition
├── routes/
│   ├── authRoutes.js            # Authentication routes
│   ├── assignmentRoutes.js      # Assignment routes
├── .env                         # Environment variables
├── server.js                    # Main server file
└── config/
    └── db.js                    # Database connection
```

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
