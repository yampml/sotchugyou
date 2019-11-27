const faker = require('faker');
const bcrypt = require('bcryptjs');
const models = require('../models/modelsIndex');

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
    
    for(let i=count; i>0; i--) {
        let user = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password_hash: bcrypt.hashSync("foobarpassword"),
            dob: faker.date.past(),
        }
        let usr = await models.User.create({ ...user })
        let user_child = null;
        if(i <= 2) {
            let role = await models.Role.findByPk(1);
            await usr.setRole(role);
            
            user_child = await models.Instructor.create({});
            await usr.setInstructor(user_child);
        } else {
            let role = await models.Role.findByPk(2);
            await usr.setRole(role);

            user_child = await models.Student.create({});
            await usr.setStudent(user_child);
        }
    }
}

const seedClassroom = async (count) => {
    let countClassroom = count / 4; // number of classrooms = number of users / 4;
    await models.Classroom.truncate();
    await models.InstructorClassroom.truncate();
    await models.StudentClassroom.truncate();
    
    let instructor1 = await models.Instructor.findByPk(1);
    let instructor2 = await models.Instructor.findByPk(2);
    
    for(let i=0; i<countClassroom; i++) {
        let classroom = {
            name: faker.fake("Math for {{name.jobTitle}}")
        }
        let newClassroom = await models.Classroom.create({ ...classroom });
        
        if(i < countClassroom/2) {
            await newClassroom.addInstructor(instructor1);
            for(let j=count-2; j>(count-2)/2; j--) {
                await newClassroom.addStudent(await models.Student.findByPk(j));
            }
        } else {
            await newClassroom.addInstructor(instructor2);
            for(let j=(count-2)/2-1; j>0; j--) {
                await newClassroom.addStudent(await models.Student.findByPk(j));
            }
        }
    }
}

const seedExam = async (count) => {
    let countExam = count / 4;
    await models.Exam.truncate();
    await models.StudentExam.truncate();
    
    for(let i=0; i<countExam; i++) {
        let exam = {
            description: faker.fake("This is {{company.companyName}}'s examination. Schedule is {{date.future}}. Then, {{random.words}}!")
        }
        let newExam = await models.Exam.create({ ...exam });
        await newExam.setClassroom(await models.Classroom.findByPk(i+1));
        await newExam.addStudents(await models.Student.findAll());
    }
}

const seedQuestion = async (count) => {
    await models.Question.truncate();
    await models.Choice.truncate();
    let countExam = count / 4 ;
    for (let i=1; i<=countExam; i++) {
        let exam = await models.Exam.findByPk(i);
        for(let j=0; j<=15; j++) { //each exam has 15 questions
            let question = {
                description: faker.fake("What is the {{hacker.noun}} of {{hacker.abbreviation}}. {{lorem.words}}? ")
            }
            let newQuestion = await models.Question.create({ ...question });
            for(let k=0; k<=3; k++) {
                let newChoice = await models.Choice.create({
                    description: faker.fake("{{hacker.noun}} is {{hacker.ingverb}}. He's a {{hacker.adjective}} guy!"),
                    is_correct: k == 0 ? true : false
                })
                await newQuestion.addChoice(newChoice);
            }
            await newQuestion.setClassroom(await models.Classroom.findByPk(i));
            await exam.addQuestion(newQuestion);
        }
    }
}

const seedAnsweredQuestion = async (count) => {
    await models.AnsweredQuestion.truncate();

    let studentExams = await models.StudentExam.findAll({limit: 5});
    // let studentExams = await models.StudentExam.findAll();
    // console.log(studentExams)
    studentExams.forEach(async stu_ex => {
        let questions = await models.Question.findAll({ where: { exam_id: stu_ex.exam_id }});
        questions.forEach(async question => {
            let choices = await question.getChoices();
            let newAnsQues = await models.AnsweredQuestion.create({});
            await newAnsQues.setStudentExam(stu_ex);
            await newAnsQues.setQuestion(question);
            await newAnsQues.setChoice(choices[Math.floor(Math.random() * choices.length) + 1]);
        })
    })
}

module.exports = async () => {
    let count = 20; // number of Users
    // await seedRole();
    // await seedUser(count);
    // await seedClassroom(count);
    // await seedExam(count);
    await seedQuestion(count);
    await seedAnsweredQuestion(count);
}