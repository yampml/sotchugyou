const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const { Classroom, Exam, Question, Choice, StudentExam, AnsweredQuestion } = require('../models/modelsIndex');
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
      console.log(exams);
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
      console.log(questions);
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
      console.log(choices);
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
        const error = new Error('Could not find classroom with ID ' + classroom + '!');
        error.statusCode = 404;
        throw error;
      }
      // else res.status(500).json({ message: 'Forbidden !'})
      console.log(classroomData);
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
  StudentExam.findAll({
    where: {
      student_id: requestData.user_id,
      exam_id: requestData.exam_id,
      // status: 'TAKING'
    }
  })
  .then( async result => {
    const answerData = requestData.answerData;
    console.log(answerData)
    if(result[0]) {
      await result[0].destroy()
      await AnsweredQuestion.destroy({ where: { student_exam_id: result[0].student_exam_id }});
    };
    let studentExam = await StudentExam.create({ student_id: requestData.user_id, exam_id: requestData.exam_id, status: 'TAKED' });
    


    for(let i=0; i<answerData.length; i++) {
      let answeredQuestion = await AnsweredQuestion.create({ question_id: answerData[i].question_id, choice_id: answerData[i].choice_id, student_exam_id: studentExam.student_exam_id });
    }

    res.status(200).json({ message: 'Student Exam submitted successfully'});
  })
  .catch(err => {
    res.status(404).json({ message: 'Student Exam not found: ', err });
  })

}

// exports.updateUser = (req, res, next) => {
//   const userID = req.params.userID;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed, entered data is incorrect.');
//     error.statusCode = 422;
//     throw error;
//   }
//   const email = req.body.email;
//   User.findByPk(userID)
//     .then(user => {
//       if (!user) {
//         const error = new Error('Could not find post.');
//         error.statusCode = 404;
//         throw error;
//       }
//       user.email = email;
//       return user.save();
//     })
//     .then(result => {
//       res.status(200).json({ message: 'User updated!', user: result });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.createPost = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed, entered data is incorrect.');
//     error.statusCode = 422;
//     throw error;
//   }
//   if (!req.file) {
//     const error = new Error('No image provided.');
//     error.statusCode = 422;
//     throw error;
//   }
//   const imageUrl = req.file.path;
//   const title = req.body.title;
//   const content = req.body.content;
//   let creator;
//   const post = new Post({
//     title: title,
//     content: content,
//     imageUrl: imageUrl,
//     creator: req.userId
//   });
//   post
//     .save()
//     .then(result => {
//       return User.findById(req.userId);
//     })
//     .then(user => {
//       creator = user;
//       user.posts.push(post);
//       return user.save();
//     })
//     .then(result => {
//       res.status(201).json({
//         message: 'Post created successfully!',
//         post: post,
//         creator: { _id: creator._id, name: creator.name }
//       });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.deleteUser = (req, res, next) => {
//   const userID = req.params.userID;
//   User.findByPk(userID)
//     .then(user => {
//       if (!user) {
//         const error = new Error('Could not find user.');
//         error.statusCode = 404;
//         throw error;
//       }
//       return user.destroy();
//     })
//     .then(result => {
//       res.status(200).json({ message: 'Deleted user.' });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };