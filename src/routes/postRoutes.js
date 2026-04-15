import express from 'express';
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostHandler,
} from '../controllers/postController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requirePostOwner } from '../middleware/postAuthorization.js';
import {
  validateCreatePost,
  validateId,
  validatePostQuery,
  validateUpdatePost,
} from '../middleware/postValidators.js';

const router = express.Router();

router.get('/', validatePostQuery, getAllPostsHandler);
router.get('/:id', validateId, getPostByIdHandler);

router.post('/', requireAuth, validateCreatePost, createPostHandler);

router.put(
  '/:id',
  requireAuth,
  validateId,
  validateUpdatePost,
  requirePostOwner,
  updatePostHandler
);

router.delete(
  '/:id',
  requireAuth,
  validateId,
  requirePostOwner,
  deletePostHandler
);

export default router;