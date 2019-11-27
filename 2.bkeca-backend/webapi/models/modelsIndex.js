const sequelize = require('../utils/database');

const User = sequelize.import('./User');
const AnsweredQuestion = sequelize.import('./AnsweredQuestion');
const Role = sequelize.import('./Role');
const Choice = sequelize.import('./Choice');
const Classroom = sequelize.import('./Classroom');
const Exam = sequelize.import('./Exam');
const Instructor = sequelize.import('./Instructor');
const InstructorClassroom = sequelize.import('./InstructorClassroom');
const Question = sequelize.import('./Question');
const Student = sequelize.import('./Student');
const StudentClassroom = sequelize.import('./StudentClassroom');
const StudentExam = sequelize.import('./StudentExam');

User.belongsTo(Role, { foreignKey: 'role_id'});
Role.hasMany(User, { foreignKey: 'role_id', sourceKey: 'role_id', targetKey: 'role_id'})
User.belongsTo(Student, { foreignKey: 'student_id'});
User.belongsTo(Instructor, { foreignKey: 'instructor_id'});

Classroom.belongsToMany(Instructor, { as: 'Instructors', through: 'InstructorClassroom', foreignKey: 'classroom_id'});
Instructor.belongsToMany(Classroom, { as: 'Classrooms', through: 'InstructorClassroom', foreignKey: 'instructor_id'});

Classroom.belongsToMany(Student, { as: 'Students', through: 'StudentClassroom', foreignKey: 'classroom_id'});
Student.belongsToMany(Classroom, { as: 'Classrooms', through: 'StudentClassroom', foreignKey: 'student_id'});

Exam.belongsTo(Classroom, { foreignKey: 'classroom_id' });
Classroom.hasMany(Exam, { foreignKey: 'classroom_id' });

Exam.belongsToMany(Student, { as: 'Students', through: 'StudentExam', foreignKey: 'exam_id'});
Student.belongsToMany(Exam, { as: 'Exams', through: 'StudentExam', foreignKey: 'student_id'});

Classroom.hasMany(Question, { foreignKey: 'classroom_id' });
Question.belongsTo(Classroom, { foreignKey: 'classroom_id' });

Question.hasMany(Choice, { foreignKey: 'question_id' });
Choice.belongsTo(Question, { foreignKey: 'question_id' });

Exam.hasMany(Question, { foreignKey: 'exam_id' });
Question.belongsTo(Exam, { foreignKey: 'exam_id' });

AnsweredQuestion.belongsTo(Question, { foreignKey: 'question_id' });
AnsweredQuestion.belongsTo(Choice, { foreignKey: 'choice_id' });
AnsweredQuestion.belongsTo(StudentExam, { foreignKey: 'student_exam_id' });
Question.hasMany(AnsweredQuestion, { foreignKey: 'question_id' });
Choice.hasMany(AnsweredQuestion, { foreignKey: 'choice_id' });
StudentExam.hasMany(AnsweredQuestion, { foreignKey: 'student_exam_id' });

module.exports = {
  User,
  Role,
  Instructor,
  Student,
  Classroom,
  StudentClassroom,
  InstructorClassroom,
  Exam,
  StudentExam,
  Question,
  Choice,
  AnsweredQuestion
}



