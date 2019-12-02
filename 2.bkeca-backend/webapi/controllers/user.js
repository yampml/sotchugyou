const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const { User } = require('../models/modelsIndex');
const jwt = require('jsonwebtoken');

const checkUser = (req, currentUserID) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
    // console.log(decodedToken)
    if (decodedToken.userId != currentUserID) return false;
    else return true;
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
}

exports.getUsers = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 5;
  let totalItems;
  User.count()
    .then(totalItems => {
      return User.findAll({ limit: perPage, offset: (currentPage - 1) * perPage })
    })
    .then(users => {
      res.status(200).json({
        message: 'Fetched users successfully.',
        users: users,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const userID = req.params.userID;
  User.findByPk(userID)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      if(checkUser(req, user.user_id)) res.status(200).json({ message: 'User fetched.', user: { ...user.dataValues } });
      else res.status(500).json({ message: 'Forbidden !'})
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.updateUser = (req, res, next) => {
  const userID = req.params.userID;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  User.findByPk(userID)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      user.email = email;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated!', user: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.createPost = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed, entered data is incorrect.');
//     error.statusCode = 422;
//     throw error;
//   }
//   if (!req.file) {
//     const error = new Error('No image provided.');
//     error.statusCode = 422;
//     throw error;
//   }
//   const imageUrl = req.file.path;
//   const title = req.body.title;
//   const content = req.body.content;
//   let creator;
//   const post = new Post({
//     title: title,
//     content: content,
//     imageUrl: imageUrl,
//     creator: req.userId
//   });
//   post
//     .save()
//     .then(result => {
//       return User.findById(req.userId);
//     })
//     .then(user => {
//       creator = user;
//       user.posts.push(post);
//       return user.save();
//     })
//     .then(result => {
//       res.status(201).json({
//         message: 'Post created successfully!',
//         post: post,
//         creator: { _id: creator._id, name: creator.name }
//       });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

exports.deleteUser = (req, res, next) => {
  const userID = req.params.userID;
  User.findByPk(userID)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      return user.destroy();
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted user.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// const clearImage = filePath => {
//   filePath = path.join(__dirname, '..', filePath);
//   fs.unlink(filePath, err => console.log(err));
// };
