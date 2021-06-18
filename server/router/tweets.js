import express from 'express';
import 'express-async-errors';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middleware/auth.js';

// validation
// sanitization
// Contract Testing client-server

const router = express.Router();

const validateTweet = [
    body('text').trim().isLength({ min: 3}).withMessage("text should be at least 3 characters."),
    validate
]

// GET /tweets
// GET /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweetsById);

// POST /tweets
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;