import express from 'express';
import 'express-async-errors';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

// validation
// sanitization
// Contract Testing client-server

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .isLength({ min: 5 })
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password should be at least 5 characters'),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage("name is missing"),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url')
        .isURL()
        .withMessage('invalid URL')
        .optional({ nullable: true, checkFalsy: true }),
    validate,
];

// POST /signUp
router.post('/signUp', validateSignup, authController.signUp);

// POST /tweets/:id
router.post('/login', validateCredential, authController.login);

//GET authentication Check
router.get('/me', isAuth, authController.me);

export default router;