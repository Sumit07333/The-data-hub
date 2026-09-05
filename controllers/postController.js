/**
 * Post Controller - In-Memory CRUD Logic
 * 
 * Sprint 09 Track B: Data is stored strictly in memory using a JavaScript array.
 * No external database or MongoDB is used.
 */

// In-memory data store for Sprint 09
let blogPosts = [];
let nextId = 1;

/**
 * GET /posts
 * Retrieve all blog posts. Returns empty array [] if none exist.
 */
function getAllPosts(req, res) {
  return res.status(200).json(blogPosts);
}

/**
 * GET /posts/:id
 * Retrieve a single blog post by its unique ID.
 */
function getPostById(req, res) {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  return res.status(200).json(post);
}

/**
 * POST /posts
 * Create a new blog post. Requires title and content.
 */
function createPost(req, res) {
  const { title, content, author } = req.body || {};

  if (!title || !content || typeof title !== 'string' || typeof content !== 'string' || !title.trim() || !content.trim()) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    author: author && typeof author === 'string' && author.trim() ? author.trim() : 'Anonymous'
  };

  blogPosts.push(newPost);
  return res.status(201).json(newPost);
}

/**
 * PUT /posts/:id
 * Update an existing blog post by its unique ID.
 */
function updatePost(req, res) {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const postIndex = blogPosts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content, author } = req.body || {};

  // Validate fields if provided
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    blogPosts[postIndex].title = title.trim();
  }

  if (content !== undefined) {
    if (typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ error: 'Content cannot be empty' });
    }
    blogPosts[postIndex].content = content.trim();
  }

  if (author !== undefined) {
    blogPosts[postIndex].author = typeof author === 'string' && author.trim() ? author.trim() : blogPosts[postIndex].author;
  }

  return res.status(200).json(blogPosts[postIndex]);
}

/**
 * DELETE /posts/:id
 * Delete a blog post by its unique ID.
 */
function deletePost(req, res) {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const postIndex = blogPosts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  blogPosts.splice(postIndex, 1);

  return res.status(200).json({ message: 'Post deleted successfully' });
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
