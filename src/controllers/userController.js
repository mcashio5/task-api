import {
  deleteCurrentUser,
  getCurrentUser,
  getCurrentUserPosts,
  getUsers,
  updateCurrentUser,
  updateUserRole,
} from '../services/userService.js';

export async function getUsersHandler(req, res) {
  const users = await getUsers();
  res.status(200).json(users);
}

export async function getCurrentUserHandler(req, res) {
  const user = await getCurrentUser(req.user.id);
  res.status(200).json(user);
}

export async function updateCurrentUserHandler(req, res) {
  const { email, password } = req.body;

  const updatedUser = await updateCurrentUser(req.user.id, {
    email,
    password,
  });

  res.status(200).json(updatedUser);
}

export async function deleteCurrentUserHandler(req, res) {
  await deleteCurrentUser(req.user.id);
  res.status(204).send();
}

export async function getCurrentUserPostsHandler(req, res) {
  const posts = await getCurrentUserPosts(req.user.id);
  res.status(200).json(posts);
}

export async function updateUserRoleHandler(req, res) {
  const targetUserId = Number(req.params.id);
  const { role } = req.body;

  const updatedUser = await updateUserRole(targetUserId, role);
  res.status(200).json(updatedUser);
}