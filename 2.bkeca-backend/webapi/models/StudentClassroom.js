/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StudentClassroom', {
    'student_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Student',
        key: 'student_id'
      }
    },
    'classroom_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'Classroom',
        key: 'classroom_id'
      }
    }
  }, {
    tableName: 'StudentClassroom'
  });
};
