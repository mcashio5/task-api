import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../services/postService.js';

export async function getAllPostsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: Number(offset),
    limit: Number(limit),
  };

  const posts = await getAllPosts(options);
  res.status(200).json(posts);
}

export async function getPostByIdHandler(req, res) {
  const id = Number(req.params.id);
  const post = await getPostById(id);
  res.status(200).json(post);
}

export async function createPostHandler(req, res) {
  const { title, content } = req.body;

  const newPost = await createPost({
    title,
    content,
    authorId: req.user.id,
  });

  res.status(201).json(newPost);
}

export async function updatePostHandler(req, res) {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  const updatedData = {};

  if (title !== undefined) {
    updatedData.title = title;
  }

  if (content !== undefined) {
    updatedData.content = content;
  }

  const updatedPost = await updatePost(id, updatedData);
  res.status(200).json(updatedPost);
}

export async function deletePostHandler(req, res) {
  const id = Number(req.params.id);
  await deletePost(id);
  res.status(204).send();
}