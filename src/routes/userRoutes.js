import express from 'express';
import {
  deleteCurrentUserHandler,
  getCurrentUserHandler,
  getCurrentUserPostsHandler,
  getUsersHandler,
  updateCurrentUserHandler,
  updateUserRoleHandler,
} from '../controllers/userController.js';
import { requireAdmin, requireAuth } from '../middleware/authMiddleware.js';
import {
  validateUpdateCurrentUser,
  validateUpdateRole,
  validateUserId,
} from '../middleware/userValidators.js';

const router = express.Router();

router.get('/', requireAuth, requireAdmin, getUsersHandler);
router.get('/me', requireAuth, getCurrentUserHandler);
router.put(
  '/me',
  requireAuth,
  validateUpdateCurrentUser,
  updateCurrentUserHandler
);
router.delete('/me', requireAuth, deleteCurrentUserHandler);
router.get('/me/posts', requireAuth, getCurrentUserPostsHandler);

router.patch(
  '/:id/role',
  requireAuth,
  requireAdmin,
  validateUserId,
  validateUpdateRole,
  updateUserRoleHandler
);

export default router;