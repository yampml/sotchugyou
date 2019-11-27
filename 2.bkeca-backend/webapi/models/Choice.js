/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Choice', {
    'choice_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'question_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'Question',
        key: 'question_id'
      }
    },
    'is_correct': {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: "null"
    },
    'description': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'Choice'
  });
};
