const sequelize = require('../utils/database');

const User = sequelize.import('./User');
const Role = sequelize.import('./Role');
const User_Role = sequelize.import('./User_Role');

module.exports = { User, Role, User_Role}



