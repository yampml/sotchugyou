const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');

const sequelize = require('./utils/database');

const { User } = require('./models/modelsIndex');

// const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/api', userRoutes);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  // .sync({ force: true })
  .sync()
  // .then(result => {
  //   // console.log(result);
  //   return User.findByPk(1);
  // })
  // .then(user => {
  //   if (!user) {
  //     return User.create({ email: 'test@test.com', password: 'foobar', private_key: 'priv' });
  //   }
  //   // console.log(user)
  //   return user;
  // })
  .then(_ => {
    app.listen(6969);
  })
  .catch(err => {
    console.log(err);
  });

  //
//sequelize-auto -h localhost -d bkecaDB -u root -x "my-hyper-secret-pw" -p 3366 -e mysql -o "./modelss"
