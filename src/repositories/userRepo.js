import prisma from '../config/db.js';

export async function createUser(data) {
  return prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserWithPasswordByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}

export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
}

export async function updateUserById(id, data) {
  try {
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
}

export async function deleteUserById(id) {
  try {
    return await prisma.user.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
}