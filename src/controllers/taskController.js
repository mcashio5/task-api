import { getAllTasks as getAllTasksFromService } from '../services/taskService.js';

export async function getAllTasks(req, res, next) {
  try {
    let completed;

    if (req.query.completed === 'true') {
      completed = true;
    } else if (req.query.completed === 'false') {
      completed = false;
    }

    const tasks = await getAllTasksFromService(completed);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}