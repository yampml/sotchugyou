const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /api/user/users
router.get('/users', isAuth, userController.getUsers);

// GET /api/user/:id
router.get('/user/:userID', userController.getUser);

// GET /api/user/:id/checkUserPassword
router.post('/user/:userID/checkUserPassword', userController.checkUserPassword);

// PUT /api/user/:id
router.put(
  '/user/:userID',
  isAuth,
  [
    body('email')
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.updateUser
);

// POST /api/user/:id
router.delete('/user/:userID', isAuth, userController.deleteUser);

module.exports = router;
