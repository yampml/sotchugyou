/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    'id': {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'created_at': {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'updated_at': {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'private_key': {
      type: "BLOB",
      allowNull: false,
      comment: "null"
    },
    'cert_pem': {
      type: "BLOB",
      allowNull: true,
      comment: "null"
    },
    'public_key': {
      type: "BLOB",
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'User'
  });
};
