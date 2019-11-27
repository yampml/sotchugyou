/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Student', {
    'student_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    }
  }, {
    tableName: 'Student'
  });
};
