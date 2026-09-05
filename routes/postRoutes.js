const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Standard REST endpoints for Blog Posts
// 1. GET /posts - Retrieve all posts
router.get('/', getAllPosts);

// 2. GET /posts/:id - Retrieve a post by ID
router.get('/:id', getPostById);

// 3. POST /posts - Create a new post
router.post('/', createPost);

// 4. PUT /posts/:id - Update an existing post by ID
router.put('/:id', updatePost);

// 5. DELETE /posts/:id - Delete a post by ID
router.delete('/:id', deletePost);

module.exports = router;
