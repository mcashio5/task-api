import { body, oneOf, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignup = [
  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email must be a valid email address'),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters'
    ),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];

export const validateLogin = [
  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email must be a valid email address'),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),

  handleValidationErrors,
];

export const validateUpdateCurrentUser = [
  oneOf(
    [
      body('email').exists({ values: 'falsy' }),
      body('password').exists({ values: 'falsy' }),
    ],
    {
      message: 'At least one field (email, password) must be provided',
    }
  ),

  body('email')
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email must be a valid email address'),

  body('password')
    .optional()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters'
    ),

  handleValidationErrors,
];

export const validateUserId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateRole = [
  body('role')
    .exists({ values: 'falsy' })
    .withMessage('Role is required')
    .bail()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];