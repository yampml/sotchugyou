const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const { Classroom, Exam, Question, Choice, StudentExam, AnsweredQuestion, User, Student } = require('../models/modelsIndex');
const jwt = require('jsonwebtoken');

const checkUser = (req, currentUserID) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
    // console.log(decodedToken)
    if (decodedToken.userId != currentUserID) return false;
    else return true;
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
}

exports.getClassrooms = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 5;
  let totalItems;
  Classroom.count()
    .then(totalItems => {
      return Classroom.findAll({ limit: perPage, offset: (currentPage - 1) * perPage })
    })
    .then(classrooms => {
      res.status(200).json({
        message: 'Fetched classrooms successfully.',
        classrooms: classrooms,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getClassroomsbyUser = (req, res, next) => {
  const user_id = req.params.user_id;
  const currentPage = req.query.page || 1;
  const perPage = 5;
  User.findByPk(user_id)
    .then(user => {
      return user.getStudent();
    })
    .then(student => {
      return student.getClassrooms();
    })
    .then(classrooms => {
      let start = (currentPage - 1) * perPage;
      let resData = classrooms.slice(start, start + perPage);
      res.status(200).json({
        message: 'Fetched classrooms successfully.',
        classrooms: resData,
        totalItems: classrooms.length
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getClassroom = (req, res, next) => {
  const classroomID = req.params.classroomID;
  Classroom.findByPk(classroomID)
    .then(classroom => {
      if (!classroom) {
        const error = new Error('Could not find classroom!');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Classroom fetched', classroom: { ...classroom.dataValues } });
      // else res.status(500).json({ message: 'Forbidden !'})
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getClassroomExams = (req, res, next) => {
  const classroomID = req.params.classroomID;
  Classroom.findByPk(classroomID)
    .then(classroom => {
      if (!classroom) {
        const error = new Error('Could not find classroom!');
        error.statusCode = 404;
        throw error;
      }
      // else res.status(500).json({ message: 'Forbidden !'})
      return classroom.getExams();
    })
    .then(exams => {
      res.status(200).json({ message: 'Classroom\'s exam fetched', exams: exams });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getExamQuestions = (req, res, next) => {
  const examID = req.params.examID;
  Exam.findByPk(examID)
    .then(exam => {
      if (!exam) {
        const error = new Error('Could not find exam with ID ' + examID + '!');
        error.statusCode = 404;
        throw error;
      }
      // else res.status(500).json({ message: 'Forbidden !'})
      return exam.getQuestions();
    })
    .then(questions => {
      res.status(200).json({ message: 'Exam\'s questions fetched', questions });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getQuestionChoices = (req, res, next) => {
  const questionID = req.params.questionID;
  Question.findByPk(questionID)
    .then(question => {
      if (!question) {
        const error = new Error('Could not find question with ID ' + questionID + '!');
        error.statusCode = 404;
        throw error;
      }
      // else res.status(500).json({ message: 'Forbidden !'})
      return question.getChoices();
    })
    .then(choices => {
      res.status(200).json({ message: 'Question\'s choices fetched', choices });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.getClassroomExamAllInfo = (req, res, next) => {
  const classroomID = req.params.classroomID;
  Classroom.findByPk(classroomID, {
    include: [
      {
        model: Exam,
        required: true,
        include: [
          {
            model: Question,
            required: true,
            include: [
              {
                model: Choice,
                required: true
              }
            ]
          }
        ]
      }
    ]
  })
    .then(classroomData => {
      if (!classroomData) {
        const error = new Error('Could not find classroom with ID ' + classroomID + '!');
        error.statusCode = 404;
        throw error;
      }
      // else res.status(500).json({ message: 'Forbidden !'})
      res.status(200).json({ message: 'Classroom\'s data (exams, questions, choices)  fetched', classroomData });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.submitStudentExam = (req, res, next) => {
  const requestData = req.body;
  /* 
    {"exam_id":1,"classroom_id":1,"user_id":"1","answerData":[{"question_id":1,"choice_id":3},{"question_id":2,"choice_id":6},{"question_id":3,"choice_id":10},{"question_id":4,"choice_id":null},{"question_id":5,"choice_id":19},{"question_id":6,"choice_id":null},{"question_id":7,"choice_id":null},{"question_id":8,"choice_id":null},{"question_id":9,"choice_id":null},{"question_id":10,"choice_id":null},{"question_id":11,"choice_id":null},{"question_id":12,"choice_id":null},{"question_id":13,"choice_id":null},{"question_id":14,"choice_id":null},{"question_id":15,"choice_id":null},{"question_id":16,"choice_id":null}]}
  */
  User.findByPk(requestData.user_id)
    .then(result => {
      console.log(result.student_id, requestData.exam_id)
      return StudentExam.findAll({
        where: {
          student_id: result.student_id,
          exam_id: requestData.exam_id,
          status: 'UNTAKED'
        }
      })
    })
    .then(async result => {
      console.log(result[0])

      const answerData = requestData.answerData;

      let studentExam = result[0];

      studentExam.status = 'TAKED';
      studentExam.start_time = new Date(requestData.start_time);
      studentExam.finish_time = new Date(requestData.finish_time);
      await studentExam.save();

      for (let i = 0; i < answerData.length; i++) {
        let answeredQuestion = await AnsweredQuestion.create({ question_id: answerData[i].question_id, choice_id: answerData[i].choice_id, student_exam_id: studentExam.student_exam_id });
      }

      res.status(200).json({ message: 'Student Exam submitted successfully' });
    })
    .catch(err => {
      res.status(404).json({ message: 'Error!: ', err });
      console.log(err)
    })
}

exports.allTakenExam = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findByPk(user_id);
    const studentExams = await StudentExam.findAll({ where: { student_id: user.student_id } });
    res.status(201).json({ studentExams });

  } catch (e) {
    res.status(404).json({ message: 'Error!: ', e });
  }
}

exports.getStudentExamResult = async (req, res, next) => {
  const user_id = req.params.user_id;
  const exam_id = req.params.exam_id;
  try {
    const user = await User.findByPk(user_id);
    const student_id = user.student_id
    const student_exam = await StudentExam.findAll({
      where: {
        student_id: student_id,
        exam_id: exam_id,
        // status: 'TAKEN'
      },
      include: [
        {
          model: AnsweredQuestion,
          required: true,
          include: [
            {
              model: Choice,
              required: true,
            }
          ]
        }
      ]
    });

    const exam = await Exam.findByPk(exam_id);
    const questions = await exam.getQuestions();
    const fullPoint = questions.length;
    let numberOfCorrection = 0;
    const answers = student_exam[0].AnsweredQuestions;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i].Choice.is_correct == 1) numberOfCorrection += 1;
    }

    const final_result = numberOfCorrection + "/" + fullPoint;
    const resultData = {
      final_result,
      start_time: student_exam[0].start_time,
      finish_time: student_exam[0].finish_time 
    }
    res.status(201).json(
      {
      message: "OK!", 
      resultData
      }
    )
} catch (e) {
  res.status(404).json({ message: 'Error!: ', e })
}


}