import { getById } from "../repositories/postRepo.js";

export async function requirePostOwner(req, res, next) {
  const postId = Number(req.params.id);
  const post = await getById(postId);

  if (!post) {
    return res.status(404).json({ error: `Post ${postId} not found` });
  }

  if (post.authorId !== req.user.id) {
    return res.status(403).json({ error: "Insufficient permissions" });
  }

  next();
}