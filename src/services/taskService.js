import { getAllTasks as getAllTasksFromRepo } from '../repositories/taskRepo.js';

export async function getAllTasks(completed) {
  return getAllTasksFromRepo(completed);
}