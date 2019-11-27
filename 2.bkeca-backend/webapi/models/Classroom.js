/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Classroom', {
    'classroom_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
    tableName: 'Classroom'
  });
};
