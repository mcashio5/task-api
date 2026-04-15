import {
  create,
  getAll,
  getByAuthorId,
  getById,
  remove,
  update,
} from '../repositories/postRepo.js';

export async function getAllPosts(options) {
  return getAll(options);
}

export async function getPostById(id) {
  const post = await getById(id);

  if (!post) {
    const error = new Error(`Post ${id} not found`);
    error.status = 404;
    throw error;
  }

  return post;
}

export async function getPostsByAuthorId(authorId) {
  return getByAuthorId(authorId);
}

export async function createPost(postData) {
  return create(postData);
}

export async function updatePost(id, updatedData) {
  const updatedPost = await update(id, updatedData);

  if (!updatedPost) {
    const error = new Error(`Post ${id} not found`);
    error.status = 404;
    throw error;
  }

  return updatedPost;
}

export async function deletePost(id) {
  const deletedPost = await remove(id);

  if (!deletedPost) {
    const error = new Error(`Post ${id} not found`);
    error.status = 404;
    throw error;
  }
}