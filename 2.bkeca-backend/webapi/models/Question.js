/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Question', {
    'question_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'exam_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'Exam',
        key: 'exam_id'
      }
    },
    'classroom_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'Classroom',
        key: 'classroom_id'
      }
    },
    'description': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'Question'
  });
};
