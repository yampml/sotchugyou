/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Exam', {
    'exam_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
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
      allowNull: false,
      comment: "null"
    },
    'start_time': {
      type: 'TIMESTAMP',
      allowNull: true,
      comment: "null"
    },
    'end_time': {
      type: 'TIMESTAMP',
      allowNull: true,
      comment: "null"
    },
    'name': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'duration': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null"
    },
    'status': {
      type: DataTypes.ENUM({
        values: ['OPENING', 'CLOSING']
      }),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'Exam'
  });
};
