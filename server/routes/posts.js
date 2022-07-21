import express from "express";

import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

// Creating the Router obj
const router = express.Router();

// # route : '/'
// # desc : 'testing home'
router.get('/', getPosts)

// # route : '/'
// # desc : 'creating post'
router.post('/', createPost)

// # route : '/id'
// # desc : 'updating post'
router.patch('/:id', updatePost)

// # route : '/id'
// # desc : 'deleting post'
router.delete('/:id', deletePost);

// # route : ''
// # desc : 'deleting post'
router.patch('/:id/likePost', likePost);

export default router;


// import express from 'express';
// import { getPosts, createPost } from '../controllers/posts.js';
// const router = express.Router();

// // @route : /posts
// router.get('/', getPosts);
// router.post('/', createPost);

// export default router;