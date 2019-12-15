const { validationResult } = require('express-validator/check');
const { registerUser } = require('../blockchain/registerUser');
const bcrypt = require('bcryptjs');
const aes = require('crypto-js/aes');
const jwt = require('jsonwebtoken');

const models = require('../models/modelsIndex');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    // console.log(req.body);
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const dob = req.body.dob;
    const role = req.body.role; // ["student", "instructor"]
    const hashedPw = bcrypt.hashSync(password);
    const registeredUserCA = await registerUser({ email, username, hashedPw, dob, role });
    // console.log("In signup controller:", registeredUserCA.userIdentity.privateKey)
    let priv = aes.encrypt(registeredUserCA.userIdentity.privateKey, password).toString();
    // console.log("PRIV: ", priv);
    let cert = registeredUserCA.userIdentity.certificate;

    const roleInstance = await models.Role.findOne({ where: { name: registeredUserCA.role } });

    let usr = await models.User.create({
      email: registeredUserCA.email,
      username: registeredUserCA.username,
      password_hash: hashedPw,
      priv_key: priv,
      cert: cert,
      dob: dob,
      role_id: roleInstance.role_id
    })
    if (role === "student") {
      let student = await models.Student.create({});
      await usr.setStudent(student);
    } else if (role === "instructor") {
      let instructor = await models.Instructor.create({});
      await usr.setInstructor(instructor);
    } else {
      throw "Undefined role";
    }
    await res.status(201).json({ message: 'User created!' });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  models.User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        const error = new Error();
        error.message = 'A user with this email could not be found!';
        error.statusCode = 404;
        throw error;
      }
      loadedUser = user.dataValues;
      // console.log(user.dataValues)
      return bcrypt.compare(password, user.dataValues.password_hash);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.user_id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, expiresIn: new Date().getTime() + 60 * 60 * 1000, userId: loadedUser.user_id.toString() });
    })
    .catch(err => {
      // if (!err.statusCode) {
      //   err.statusCode = 500;
      // }
      // res.status(err.statusCode).send({ message: err.message });
      next(err);
    });
};

exports.getUserStatus = (req, res, next) => {
  models.User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ status: user.status });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      // console.log(err.message)
      next(err);
    });
};

exports.updateUserStatus = (req, res, next) => {
  const newStatus = req.body.status;
  models.User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      user.status = newStatus;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
