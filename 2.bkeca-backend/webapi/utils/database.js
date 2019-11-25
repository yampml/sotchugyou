const Sequelize = require('sequelize');

const sequelize = new Sequelize('bkeca_database', 'nda', 'my-super-secret-pw', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3366,
});

module.exports = sequelize;