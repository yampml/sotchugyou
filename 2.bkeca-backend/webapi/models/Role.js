/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Role', {
    'role_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'Role'
  });
};
