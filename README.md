The Data Hub — RESTful API Server

Project Name

The Data Hub — Sprint 09: Track B (Fullstack Developer)

Project Description

The Data Hub is a backend RESTful API server built using Node.js and Express. It manages blog post resources with complete in-memory CRUD (Create, Read, Update, Delete) functionality, custom request logging middleware, and mock authentication scaffolding.

This project is built to satisfy the Sprint 09 Track B requirements. It uses an in-memory JavaScript array and does not use an external database in Sprint 09.

Live Deployment

The Data Hub API is deployed on Render.

Live API URL:
https://the-data-hub-qa8v.onrender.com

API Status / Root Endpoint:
https://the-data-hub-qa8v.onrender.com/

The root endpoint returns the API name, online status, and available endpoints.

The deployed API can be tested directly using Postman.

Technologies Used

Runtime: Node.js

Framework: Express v4.21.2

Data Store: In-memory JavaScript Array (blogPosts = [])

Development Tool: Nodemon v3.1.14

API Testing: Postman / Thunder Client / cURL

Deployment: Render

Version Control: Git / GitHub

Installation

Clone the repository and install dependencies:

npm install

Running the Server

Production Mode

npm start

Development Mode

npm run dev

The server runs on port 5000 locally by default.

Server running on port 5000

Local API:

http://localhost:5000

For deployment, the application uses the platform-provided PORT environment variable while keeping port 5000 as the local fallback.

REST API Endpoints

Method

Endpoint

Description

Expected Status

GET

/

API status and endpoint discovery

200 OK

GET

/posts

Retrieve all blog posts

200 OK

GET

/posts/:id

Retrieve a specific blog post

200 OK / 404 Not Found

POST

/posts

Create a new blog post

201 Created / 400 Bad Request

PUT

/posts/:id

Update an existing blog post

200 OK / 404 Not Found

DELETE

/posts/:id

Delete a blog post

200 OK / 404 Not Found

POST

/login

Mock authentication returning a mock JWT

200 OK / 400 Bad Request

Example Requests and Responses

POST /posts — Create a Post

Request Body:

{
  "title": "My First Post",
  "content": "This is my first blog post.",
  "author": "Aman"
}

Response — 201 Created:

{
  "id": 1,
  "title": "My First Post",
  "content": "This is my first blog post.",
  "author": "Aman"
}

GET /posts — Retrieve All Posts

Response — 200 OK:

[
  {
    "id": 1,
    "title": "My First Post",
    "content": "This is my first blog post.",
    "author": "Aman"
  }
]

GET /posts/:id — Retrieve a Single Post

Example:

http://localhost:5000/posts/1

Response — 200 OK:

{
  "id": 1,
  "title": "My First Post",
  "content": "This is my first blog post.",
  "author": "Aman"
}

Error Response — 404 Not Found:

{
  "error": "Post not found"
}

PUT /posts/:id — Update a Post

Example:

http://localhost:5000/posts/1

Request Body:

{
  "title": "Updated First Post",
  "content": "Updated content for the first blog post."
}

Response — 200 OK:

{
  "id": 1,
  "title": "Updated First Post",
  "content": "Updated content for the first blog post.",
  "author": "Aman"
}

DELETE /posts/:id — Delete a Post

Example:

http://localhost:5000/posts/1

Response — 200 OK:

{
  "message": "Post deleted successfully"
}

POST /login — Mock Authentication

Request Body:

{
  "email": "user@example.com",
  "password": "password123"
}

Response — 200 OK:

{
  "message": "Login successful",
  "token": "mock-jwt-token"
}

This is mock authentication scaffolding for Sprint 09. It does not perform real database verification or production authentication.

Postman Testing

The API was tested using Postman locally and on the deployed Render URL.

Local Base URL

http://localhost:5000

Live Base URL

https://the-data-hub-qa8v.onrender.com

Tested Operations

POST /posts — Create post

GET /posts — Retrieve all posts

GET /posts/1 — Retrieve a specific post

PUT /posts/1 — Update post

DELETE /posts/1 — Delete post

GET /posts — Verify remaining data

POST /login — Verify mock JWT authentication

GET /posts/999 — Verify 404 error handling

The deployed CRUD endpoints and login endpoint were successfully verified through Postman.

Custom Request Logger

The project includes custom middleware that logs every incoming HTTP request.

Example log format:

[GET] /posts - 06:03 PM
[POST] /posts - 06:16 PM
[PUT] /posts/1 - 06:55 PM
[DELETE] /posts/1 - 06:56 PM
[POST] /login - 07:02 PM

The logger records:

HTTP Method

Request URL

Timestamp

Project Structure

the-data-hub/

├── server.js
├── routes/
│   └── postRoutes.js
├── controllers/
│   └── postController.js
├── middleware/
│   └── logger.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
├── Prompts.md
└── README.md

Main Files

server.js — Express application entry point and server configuration

routes/postRoutes.js — RESTful route definitions for /posts

controllers/postController.js — In-memory blog post CRUD logic

middleware/logger.js — Custom request logging middleware

Prompts.md — AI prompts used during development

README.md — Project documentation and API guide

Sprint 09 Objective

The objective of Sprint 09 Track B is to implement and understand:

Node.js server initialization

Express.js

REST API architecture

RESTful routing

HTTP methods

Request body parsing using express.json()

In-memory data management

CRUD operations

Custom middleware

HTTP status codes

API testing using Postman

Mock authentication scaffolding

Deployment of an Express API

Data Storage

Sprint 09 intentionally uses an in-memory JavaScript array:

let blogPosts = [];

No external database is used in Sprint 09.

Because the data is stored in memory, posts reset whenever the server process or deployed service restarts.

Sprint 10 Note

Sprint 10 will extend this project by replacing the Sprint 09 in-memory data store with persistent MongoDB Atlas + Mongoose storage.

Sprint 09 does not use MongoDB or Mongoose.

The current controller-based architecture is intended to make future database integration easier without restructuring the REST routes.

Deployment

The API is deployed on Render.

Live API:

https://the-data-hub-qa8v.onrender.com

API Status:

https://the-data-hub-qa8v.onrender.com/

GitHub Repository

Source Code:

https://github.com/Sumit07333/The-data-hub

Author

Sprint 09 Track B — Fullstack Developer

Project: The Data Hub