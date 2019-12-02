const express = require('express');
const { body } = require('express-validator/check');

const classroomController = require('../controllers/classroom');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /api/classrooms
router.get('/classrooms', classroomController.getClassrooms);

// GET /api/classroom/:id
router.get('/classroom/:classroomID', classroomController.getClassroom);

// PUT /api/classroom/:id
// router.put(
//   '/user/:userID',
//   isAuth,
//   [
//     body('email')
//       .trim()
//       .isLength({ min: 6 }),
//   ],
//   userController.updateUser
// );

// POST /api/classroom/:id
// router.delete('/classroom/:id', isAuth, userController.deleteUser);

// GET /api/classroom/:id/exams
router.get('/classroom/:classroomID/exams/', classroomController.getClassroomExams);

// GET /api/exam/:id/questions
router.get('/exam/:examID/questions', classroomController.getExamQuestions);

// GET /api/question/:id/choices
router.get('/question/:questionID/choices', classroomController.getQuestionChoices);


// GET /api/classroom/:id/examAllInfo
router.get('/classroom/:classroomID/examAllInfo', classroomController.getClassroomExamAllInfo);

// GET /api/classroom/:id/exam/:id


module.exports = router;
