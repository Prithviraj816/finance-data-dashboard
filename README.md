# Finance Dashboard Backend
This project is a backend system for a finance dashboard that manages users, financial records, and provides summary analytics.

It demonstrates API design, role-based access control, data modeling, and backend logic implementation.

# Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Nodemon

# Setup Instructions
1. Clone the repository:
   git clone https://github.com/Prithviraj816/finance-data-dashboard.git

2. Install dependencies:
   npm install

3. Create a .env file in root:
   PORT = 3000
   MONGO_URI = your_mongodb_connection_string

4. Run the server:
   npm run dev

# Roles & Permissions
The system implements role-based access control with three roles:

- Viewer:
  - Can only access dashboard summary data.

- Analyst:
  - Can view financial records.
  - Can access dashboard insights.

- Admin:
  - Full access to the system.
  - Can create, update, and delete users and records.

# Access Control Design
Role-based access is enforced using middleware that checks the role provided in request headers.

- Viewer → dashboard only
- Analyst → read-only access to records + dashboard
- Admin → full control

This ensures proper separation of responsibilities and prevents unauthorized operations.

# API Endpoints
1. For Users
POST /api/users       -> Create user (Admin only)
GET /api/users        -> Get all users (Admin only)
DELETE /api/users/:id -> Delete user (Admin only)
PATCH /api/users/:id  -> Update user (Admin only)

2. For Records
POST /api/records       -> Create record (Admin only)
GET /api/records        -> Get records (Admin and Analyst)
PATCH /api/records/:id  -> Update record (Admin only)
DELETE /api/records/:id -> Delete record (Admin only) 

3. For Dashboard
GET /api/dashboard/summary → Get financial summary (Admin, Analyst and Viewer)

# API Response Format
All responses follow a consistent structure: 

Success:
{
  "success": true,
  "data": ....
}

Error:
{
  "success": false,
  "message": "Error message"
}

# Testing 
APIs were tested using Postman with multiple scenarios including:
- Role-based access validation,
- Invalid input handling,
- Resource not found cases,
- Route not found cases,
- Data integrity checks.

APIs can be tested using Postman by setting the role in request headers:
Example:
Key: role
Value: admin or analyst or viewer

# Assumptions 
- Authentication is mocked using request headers.
- In production, roles would be derived from authenticated user tokens(like JWT).
- Each record is linked to a user via userId.
- Focus is on backend logic, not UI.

# Features 
- Role-Based Access Control with Viewer, Analyst, and Admin roles.
- Secure API access using role-based middleware.
- CRUD operations for financial records and users.
- Dashboard summary including total income, total expense and balance.
- Input validation for all critical fields is implemented.
- Centralized error handling using custom error class.
- Resource validation implemented(checks for non-existing users and records).
- Data integrity enforcement by validating user existence before record creation.
- Cascade deletion: Deleting a user removes all associated financial records.
- Modular and scalable backend architecture.

# Data Integrity
- Ensures records are linked to valid users.
- Prevents creation of records with invalid userId.
- Maintains consistency using cascade deletion.

# Error Handling
- Centralized error handling using custom ApiError class.
- Handles:
  - Invalid input data,
  - Unauthorized access,
  - Resource not found (404),
  - Invalid routes.
- Returns consistent JSON error responses.

# This project was developed independently with a focus on backend design and system-level thinking.