import bcrypt from "bcrypt";
import { getPostsByAuthorId } from "./postService.js";
import {
  deleteUserById,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUserById,
} from "../repositories/userRepo.js";

export async function getUsers() {
  return getAllUsers();
}

export async function getCurrentUser(userId) {
  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
}

export async function updateCurrentUser(userId, data) {
  const existingUser = await findUserById(userId);

  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const updateData = {};

  if (data.email !== undefined) {
    const emailOwner = await findUserByEmail(data.email);
    if (emailOwner && emailOwner.id !== userId) {
      const error = new Error("Email already used");
      error.status = 409;
      throw error;
    }
    updateData.email = data.email;
  }

  if (data.password !== undefined) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  if (Object.keys(updateData).length === 0) {
    const error = new Error("No valid fields provided");
    error.status = 400;
    throw error;
  }

  return updateUserById(userId, updateData);
}

export async function deleteCurrentUser(userId) {
  const deletedUser = await deleteUserById(userId);

  if (!deletedUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
}

export async function getCurrentUserPosts(userId) {
  return getPostsByAuthorId(userId);
}

export async function updateUserRole(targetUserId, role) {
  const updatedUser = await updateUserById(targetUserId, { role });

  if (!updatedUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return updatedUser;
}