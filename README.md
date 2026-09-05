# The Data Hub — RESTful API Server

## 1. Project Name
**The Data Hub** — Sprint 09: Track B (Fullstack Developer)

---

## 2. Project Description
The Data Hub is a backend RESTful API server built using Node.js and Express. It manages blog post resources with complete in-memory CRUD (Create, Read, Update, Delete) functionality, custom request logging middleware, and mock authentication scaffolding. 

This project is built strictly to satisfy the **Sprint 09 Track B** requirements. It operates with an in-memory JavaScript array without any external database dependencies.

---

## 3. Technologies Used
- **Runtime Environment:** Node.js
- **Framework:** Express (v4.21.2)
- **Data Store:** In-memory JavaScript Array (`blogPosts = []`)
- **Developer Tool:** Nodemon (v3.1.14)
- **API Testing:** Postman / Thunder Client / cURL

---

## 4. Installation Instructions
Clone the repository and install dependencies:

```bash
npm install
```

---

## 5. How to Start the Server
To run the server in production mode:
```bash
npm start
```

To run the server in development mode with automatic reload on changes:
```bash
npm run dev
```

The server listens on **Port 5000** by default:
```
Server running on port 5000
```
Accessible locally at: `http://localhost:5000`

---

## 6. Available Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API status and endpoint discovery | 200 OK |
| `GET` | `/posts` | Retrieve all blog posts | 200 OK |
| `GET` | `/posts/:id` | Retrieve a specific blog post by ID | 200 OK / 404 Not Found |
| `POST` | `/posts` | Create a new blog post | 201 Created / 400 Bad Request |
| `PUT` | `/posts/:id` | Update an existing blog post by ID | 200 OK / 400 Bad Request / 404 Not Found |
| `DELETE` | `/posts/:id` | Delete a blog post by ID | 200 OK / 404 Not Found |
| `POST` | `/login` | Mock authentication endpoint returning mock JWT | 200 OK / 400 Bad Request |

---

## 7. Example Request & Response Payloads

### 1. `POST /posts` (Create Post)
**Headers:**
`Content-Type: application/json`

**Request Body:**
```json
{
  "title": "My First Post",
  "content": "This is my first blog post.",
  "author": "Aman"
}
```

**Response (HTTP 201 Created):**
```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is my first blog post.",
  "author": "Aman"
}
```

---

### 2. `GET /posts` (Retrieve All Posts)
**Response (HTTP 200 OK):**
```json
[
  {
    "id": 1,
    "title": "My First Post",
    "content": "This is my first blog post.",
    "author": "Aman"
  }
]
```

---

### 3. `GET /posts/:id` (Retrieve Single Post)
**URL:** `http://localhost:5000/posts/1`

**Response (HTTP 200 OK):**
```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is my first blog post.",
  "author": "Aman"
}
```

**Error Response (HTTP 404 Not Found):**
```json
{
  "error": "Post not found"
}
```

---

### 4. `PUT /posts/:id` (Update Post)
**URL:** `http://localhost:5000/posts/1`  
**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "Updated First Post",
  "content": "Updated content for the first blog post."
}
```

**Response (HTTP 200 OK):**
```json
{
  "id": 1,
  "title": "Updated First Post",
  "content": "Updated content for the first blog post.",
  "author": "Aman"
}
```

---

### 5. `DELETE /posts/:id` (Delete Post)
**URL:** `http://localhost:5000/posts/1`

**Response (HTTP 200 OK):**
```json
{
  "message": "Post deleted successfully"
}
```

---

### 6. `POST /login` (Mock Authentication)
**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (HTTP 200 OK):**
```json
{
  "message": "Login successful",
  "token": "mock-jwt-token"
}
```
*Note: This is a mock authentication endpoint designed for Sprint 09 scaffolding and does not perform real database verification or production cryptography.*

---

## 8. Postman / Thunder Client Testing Instructions
Open Postman or Thunder Client and follow this sequence:

1. **Test 1 — POST /posts**: Set method to `POST`, URL to `http://localhost:5000/posts`, Body to JSON: `{"title": "My First Post", "content": "This is my first post.", "author": "Aman"}`. Verify status is **201 Created** and returned object includes `id: 1`.
2. **Test 2 — POST /posts**: Send a second post with title `"Second Post"` and verify it returns `id: 2`.
3. **Test 3 — GET /posts**: Set method to `GET`, URL to `http://localhost:5000/posts`. Verify status is **200 OK** and array contains both posts.
4. **Test 4 — GET /posts/1**: Set method to `GET`, URL to `http://localhost:5000/posts/1`. Verify status is **200 OK** and post 1 is returned.
5. **Test 5 — PUT /posts/1**: Set method to `PUT`, URL to `http://localhost:5000/posts/1`, Body: `{"title": "Updated Post", "content": "Updated content"}`. Verify status is **200 OK** and updated fields are returned.
6. **Test 6 — GET /posts/1**: Retrieve post 1 again to verify changes are in memory.
7. **Test 7 — DELETE /posts/1**: Set method to `DELETE`, URL to `http://localhost:5000/posts/1`. Verify status is **200 OK** with message `"Post deleted successfully"`.
8. **Test 8 — GET /posts/1**: Verify status is **404 Not Found** with `{"error": "Post not found"}`.
9. **Test 9 — GET /posts**: Verify only post 2 remains in the array.
10. **Test 10 — POST /login**: Send JSON with `email` and `password`. Verify status is **200 OK** and `token: "mock-jwt-token"` is returned.
11. **Negative Validation Tests**:
   - `POST /posts` with `{ "content": "no title" }` -> verify **400 Bad Request**.
   - `GET /posts/9999` -> verify **404 Not Found**.
   - `PUT /posts/9999` -> verify **404 Not Found**.
   - `DELETE /posts/9999` -> verify **404 Not Found**.

---

## 9. Project Structure
```
the-data-hub/
├── server.js               # Application entry point, Express config & server listening
├── routes/
│   └── postRoutes.js       # RESTful route definitions for /posts
├── controllers/
│   └── postController.js   # In-memory blogPosts array and CRUD business logic
├── middleware/
│   └── logger.js           # Custom request logging middleware ([METHOD] URL - TIME)
├── package.json            # Project manifest, scripts, and dependencies
├── .gitignore              # Ignores node_modules and local development artifacts
├── Prompts.md              # Documented AI prompts used during development
└── README.md               # Project documentation and API guide
```

---

## 10. Sprint 09 Objective
The objective of Sprint 09 Track B is to master server initialization, REST routing conventions, request body parsing with `express.json()`, custom middleware design, and HTTP status code semantics using pure Node.js and Express.

---

## 11. Sprint 10 Note (Data Persistence)
> **IMPORTANT:** In Sprint 09, all data is strictly stored in an **in-memory JavaScript array (`blogPosts = []`)**. 
> All data resets when the server process terminates.
> In **Sprint 10 Track B**, this in-memory data store will be replaced with **MongoDB Atlas + Mongoose**. The controller-based architecture was chosen so that in Sprint 10, only the controller functions will be updated to query Mongoose models without having to restructure routes or the server entry point. No MongoDB or Mongoose packages are installed or used in Sprint 09.
