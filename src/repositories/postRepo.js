import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const where = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  return prisma.post.findMany({
    where,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
}

export async function getById(id) {
  return prisma.post.findUnique({
    where: { id },
  });
}

export async function getByAuthorId(authorId) {
  return prisma.post.findMany({
    where: { authorId },
    orderBy: { id: 'asc' },
  });
}

export async function create(postData) {
  return prisma.post.create({
    data: postData,
  });
}

export async function update(id, updatedData) {
  try {
    return await prisma.post.update({
      where: { id },
      data: updatedData,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
}