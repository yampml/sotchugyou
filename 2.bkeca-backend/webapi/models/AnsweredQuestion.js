/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AnsweredQuestion', {
    'answered_question_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'student_exam_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'StudentExam',
        key: 'student_exam_id'
      }
    },
    'choice_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'Choice',
        key: 'choice_id'
      }
    },
    'question_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'Question',
        key: 'question_id'
      }
    }
  }, {
    tableName: 'AnsweredQuestion'
  });
};
