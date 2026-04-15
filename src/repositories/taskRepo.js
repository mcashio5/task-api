import prisma from '../config/db.js';

export async function getAllTasks(completed) {
  const where = {};

  if (completed !== undefined) {
    where.completed = completed;
  }

  return prisma.task.findMany({
    where,
    orderBy: {
      id: 'asc',
    },
  });
}