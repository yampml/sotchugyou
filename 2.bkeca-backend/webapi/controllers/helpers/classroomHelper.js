
const { Classroom, Exam, Question, Choice, StudentExam, AnsweredQuestion, User, Student } = require('../models/modelsIndex');

/*
    "student": {
        "student_id": "1",
        "username": "Nguyen Dinh An",
        "email": "nguyendinhan97@gmail.com",
        "dob": "08/07/1997"
    },
    "classroom": {
        "classroom_id": "1",
        "name": "Computing Class 1"
    },
    "question_responses": [
        {
            "question": {
                "question_id": "1",
                "description": "Why is C++ so fast?",
                "right_choice": "1",
                "choices": [
                    "Choice 1",
                    "Choice 2",
                    "Choice 3",
                    "Choice 4"
                ]
            },
            "student_choices": [
                "1"
            ]
        },
        {
            "question": {
                "question_id": "2",
                "description": "Why is Java so slow?",
                "right_choice": "1",
                "choices": [
                    "Choice 1",
                    "Choice 2",
                    "Choice 3",
                    "Choice 4"
                ]
            },
            "student_choices": [
                "1",
                "1"
            ]
        }
    ],
    "mark": "2/2",
    "passed": true,
    "started_at": "0001-01-01T00:00:00Z",
    "finished_at": "2009-11-10T23:00:00Z"

*/

exports.studentTest4Chaincode = (student, classroom, question_responses, mark, passed, started_at, finished_at ) => {

    let chaincodeData = {
        

    }



}