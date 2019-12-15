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

// POST /api/submitExam
router.post('/submitExam', classroomController.submitStudentExam);

// GET /api/user/:id/allTakenExams
router.get('/user/:user_id/allTakenExams', classroomController.allTakenExam);

// GET /api/user/:user_id/classrooms
router.get('/user/:user_id/classrooms', classroomController.getClassroomsbyUser);

// GET /api/user/:user_id/exam/:exam_id/result
router.get('/user/:user_id/exam/:exam_id/getStudentExamResult', classroomController.getStudentExamResult);

// POST /api/user/:user_id/exam/:exam_id/sendExamResultToBlockchain
router.post('/user/:user_id/exam/:exam_id/sendExamResultToBlockchain', classroomController.sendExamResultToBlockchain);

module.exports = router;
