/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StudentExam', {
    'student_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Student',
        key: 'student_id'
      }
    },
    'exam_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'Exam',
        key: 'exam_id'
      }
    },
    'student_exam_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'status': {
      type: DataTypes.ENUM({
        values: ['UNTAKED', 'TAKING', 'TAKED', 'ONCHAIN']
      }),
      defaultValue: 'UNTAKED',
      allowNull: true,
      comment: "null"
    },
    'start_time': {
      type: 'TIMESTAMP',
      allowNull: true,
      comment: "null"
    },
    'finish_time': {
      type: 'TIMESTAMP',
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'StudentExam'
  });
};
