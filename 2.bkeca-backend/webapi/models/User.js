/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    'user_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'email': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'username': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    },
    'password_hash': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'dob': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'priv_key': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'cert': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'role_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'Role',
        key: 'role_id'
      }
    },
    'student_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'Student',
        key: 'student_id'
      }
    },
    'instructor_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'Instructor',
        key: 'instructor_id'
      }
    }
  }, {
    tableName: 'User'
  });
};
