const faker = require('faker');
const bcrypt = require('bcryptjs');
const models = require('../models/modelsIndex');
const axios = require('axios');

faker.locale = "en" // en ja vi
faker.seed(123);

const seedRole = async () => {
  await models.Role.truncate();
  await models.Role.create({ name: "Student" });
  await models.Role.create({ name: "Instructor" });
}

const seedUser = async (count) => {
  await models.User.truncate();
  await models.Instructor.truncate();
  await models.Student.truncate();

  const authData = {
    email: 'ndaadn2@gmail.com',
    password: 'foobarpassword',
    username: 'Nguyen Dinh An',
    dob: new Date(1997, 8, 7),
    role: 'student'
  }

  await axios // sign up
    .put("http://localhost:6969/auth/signup/", authData)
    .then(response => {
      console.log("Axios response: ", response.statusText);
    })
    .catch(err => {
      console.log("Axios Error: ", err.response.status.statusText);
    });

  const authData2 = {
    email: 'instructor@gmail.com',
    password: 'foobarpassword',
    username: 'Le Trong Hieu',
    dob: new Date(1997, 8, 7),
    role: 'instructor'
  }

  await axios // sign up
    .put("http://localhost:6969/auth/signup/", authData2)
    .then(response => {
      console.log("Axios response: ", response.statusText);
    })
    .catch(err => {
      console.log("Axios Error: ", err.response.status.statusText);
    });


  for (let i = count; i > 0; i--) {
    let authData = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'foobarpassword',
      dob: faker.date.past(),
      role: 'student'
    }
    await axios
      .put("http://localhost:6969/auth/signup/", authData)
      .then(response => {
        console.log("Axios response: ", response.statusText);
      })
      .catch(err => {
        console.log("Axios Error: ", err.response.status.statusText);
      });
  }
  console.log("DONE SEED USER!")
}

const seedClassroom = async (count) => {
  let countClassroom = 15;
  await models.Classroom.truncate();
  await models.InstructorClassroom.truncate();
  await models.StudentClassroom.truncate();

  let instructor1 = await models.Instructor.findByPk(1);

  let classroomName = ["Revolutionary way of VN 1",
  "Object Oriented Programming 1",
  "Computer Graphic 1",
  "Data Structure 1",
  "Calculus 1",
  "Electricity Technical 1",
  "Revolutionary way of VN 2",
  "Object Oriented Programming 2",
  "Computer Graphic 2",
  "Data Structure 2",
  "Calculus 2",
  "Electricity Technical 2",
  "Revolutionary way of VN 3",
  "Object Oriented Programming 3",
  "Computer Graphic 3",
  "Data Structure 3",
  "Calculus 3",
  "Electricity Technical 3",
  "Revolutionary way of VN 4",
  "Object Oriented Programming 4",
  "Computer Graphic 4",
  "Data Structure 4",
  "Calculus 4",
  "Electricity Technical 4",]

  for (let i = 0; i < countClassroom; i++) {
    let classroom = {
      name: classroomName[i]
    }
    let newClassroom = await models.Classroom.create({ ...classroom });

    await newClassroom.addInstructor(instructor1);
    for (let j = 1; j <= 11; j++) {
      await newClassroom.addStudent(await models.Student.findByPk(j));
    }
  }
}

const seedExam = async (count) => {
  let countExam = 10;
  await models.Exam.truncate();
  await models.StudentExam.truncate();

  let numberOfClassroomHaveExam = 15; // all


  for (let j=1; j<=numberOfClassroomHaveExam; j++)
  {
    const classroom = await models.Classroom.findByPk(j);
    for (let i = 0; i < countExam; i++) {
      let exam = {
        description: faker.fake("This is {{company.companyName}}'s examination. Schedule is {{date.future}}. Then, {{random.words}}!"),
        name: `Test ${i} of Classroom ${j}`,
        start_time: new Date("3 December 2019 13:30:00 GMT+07:00"),
        end_time: new Date("30 December 2019 21:00:00 GMT+07:00"),
        duration: 1, //minutes
        status: 'OPENING'
      }
      let newExam = await models.Exam.create({ ...exam });
      await newExam.setClassroom(classroom);
      const classroomstudents = await classroom.getStudents();
      await newExam.addStudents(classroomstudents);
    }
  }
}

const seedQuestion = async (count) => {
  await models.Question.truncate();
  await models.Choice.truncate();
  let countExam = await models.Exam.count();
  for (let i = 0; i < countExam; i++) {
    let exam = await models.Exam.findByPk(i + 1);
    for (let j = 0; j <= 15; j++) { //each exam has 16 questions
      let question = {
        description: faker.fake("In a {{hacker.noun}} system, we have {{random.number}} of {{hacker.noun}}. So, What is the {{hacker.noun}} of {{hacker.abbreviation}}?  ")
      }
      let newQuestion = await models.Question.create({ ...question });
      for (let k = 0; k <= 3; k++) {
        let newChoice = await models.Choice.create({
          description: faker.fake("{{hacker.noun}} is {{hacker.ingverb}}."),
          is_correct: k == 0 ? true : false
        })
        await newQuestion.addChoice(newChoice);
      }
      await newQuestion.setClassroom(await exam.getClassroom());
      await exam.addQuestion(newQuestion);
    }
  }
}

const seedAnsweredQuestion = async (count) => {
  await models.AnsweredQuestion.truncate();

  // let studentExams = await models.StudentExam.findAll({ limit: 5 });
  // // let studentExams = await models.StudentExam.findAll();
  // // console.log(studentExams)
  // for (let i = 0; i < studentExams.length; i++) {
  //   await studentExams[i].update({ status: 'UNTAKED' })
  //   let questions = await models.Question.findAll({ where: { exam_id: studentExams[i].exam_id } });
  //   for (let j = 0; j < questions.length; j++) {
  //     let choices = await questions[j].getChoices();
  //     let newAnsQues = await models.AnsweredQuestion.create({});
  //     await newAnsQues.setStudentExam(studentExams[i]);
  //     await newAnsQues.setQuestion(questions[j]);
  //     await newAnsQues.setChoice(choices[Math.floor(Math.random() * choices.length)]);
  //   }
  // }
}

module.exports = async () => {
  let count = 10; // number of Users
  // await seedRole();
  // await seedUser(count);
  // await seedClassroom(count);
  // await seedExam(count);
  // await seedQuestion(count);
  // await seedAnsweredQuestion(count);
}