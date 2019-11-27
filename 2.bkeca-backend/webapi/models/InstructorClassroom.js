/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('InstructorClassroom', {
    'instructor_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Instructor',
        key: 'instructor_id'
      }
    },
    'classroom_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Classroom',
        key: 'classroom_id'
      }
    },
    'isCreator': {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'InstructorClassroom'
  });
};
