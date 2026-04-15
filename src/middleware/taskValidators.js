import { query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateGetTasks = [
  query('completed')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('completed must be true or false'),
  handleValidationErrors,
];