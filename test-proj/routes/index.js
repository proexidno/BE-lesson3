var express = require('express');
var router = express.Router();


function questionsShaffle(question) {
  let newTypes = Object.assign({}, types)
  newTypes[question.type] = 1
  let { type } = question
  if (type.textQuest) {
    return {
      ID: question.ID,
      type: newTypes,
      question: question.question
    }
  }
  let { options } = question
  // options.sort(() => Math.random() - 0.5);
  return {
    type: newTypes,
    question: question.question,
    options: options
  }
}

const tests = [
  {
    title: "1234512351435 ",
    decription: "Dolor id amet id occaecat exercitation commodo adipisicing deserunt culpa veniam aliquip eu incididunt. Quis commodo aute ex aliquip excepteur dolor. Ea eiusmod adipisicing enim enim quis anim labore tempor ad esse. Aute laborum ut magna consequat magna proident labore id.",
    detailedDesc: "Mollit minim nisi sint deserunt elit sunt amet eu culpa. Laboris aliquip amet commodo ex laborum enim eu duis fugiat culpa nulla consequat qui labore. Et ea incididunt magna enim aute aute dolore adipisicing veniam. Ad sunt qui culpa eu reprehenderit. <br><br> Elit dolore ea quis ea proident quis ad dolor. Reprehenderit anim velit sit mollit cupidatat ipsum ullamco mollit eu eiusmod sunt. Officia ea cupidatat officia voluptate eu ullamco ex do ad aliquip Lorem nisi mollit magna. Anim labore commodo exercitation velit quis. Nisi cillum adipisicing esse tempor cupidatat do nostrud veniam duis exercitation. Voluptate cillum elit incididunt cupidatat anim aute ad dolore ut. Laborum eiusmod cillum laboris sit aute elit Lorem est deserunt pariatur aute non exercitation.",
    questions: [
      {
        type: "oneOf",
        question: "Ut officia officia et magna.",
        options: [
          "1",
          "12",
          "123",
          "1234"
        ],
        answer: "1"
      },
      {
        type: "multipleOf",
        question: "Ut officia officia et magna.",
        options: [
          "1",
          "12",
          "123",
          "1234",
          "12345",
          "123456"
        ],
        answer: ["1", "123", "12345", "123456"],
        answerMarkingSystem: (right, maxRightAnswers) => {
          let maxMarks = 3
          let pardonCoefficient = 1
          return Math.ceil((maxRightAnswers - right) / pardonCoefficient) < maxMarks ? maxMarks - Math.ceil((maxRightAnswers - right) / pardonCoefficient) : 0
        }
      },
      {
        type: "textQuest",
        question: "Commodo excepteur do mollit culpa mollit. Sunt reprehenderit occaecat excepteur id consequat aute pariatur do duis.",
        answer: "admin",
        answerMarkingSystem: (text, rightText) => {
          return text === rightText ? 5 : 0
        }
      },
      {
        type: "oneOf",
        question: "Ut officia officia et magna.",
        options: [
          "1",
          "12",
          "123",
          "1234"
        ],
        answer: "1"
      },
      {
        type: "multipleOf",
        question: "Ut officia officia et magna.",
        options: [
          "1",
          "12",
          "123",
          "1234",
          "12345",
          "123456"
        ],
        answer: ["1", "123", "12345", "123456"],
        answerMarkingSystem: (right, maxRightAnswers) => {
          let maxMarks = 3
          let pardonCoefficient = 1
          return Math.ceil((maxRightAnswers - right) / pardonCoefficient) < maxMarks ? maxMarks - Math.ceil((maxRightAnswers - right) / pardonCoefficient) : 0
        }
      },
      {
        type: "textQuest",
        question: "Commodo excepteur do mollit culpa mollit. Sunt reprehenderit occaecat excepteur id consequat aute pariatur do duis.",
        answer: "admin",
        answerMarkingSystem: (text, rightText) => {
          return text === rightText ? 5 : 0
        }
      }
    ],
    maxMark: 18
  },
  {
    title: "12345",
    decription: "Dolor id amet id occaecat exercitation commodo adipisicing deserunt culpa veniam aliquip eu incididunt. Quis commodo aute ex aliquip excepteur dolor. Ea eiusmod adipisicing enim enim quis anim labore tempor ad esse. Aute laborum ut magna consequat magna proident labore id.",
    detailedDesc: "Laborum commodo sit ullamco labore pariatur nulla officia incididunt enim. Magna quis anim labore aliqua proident deserunt voluptate nulla id laborum. Sit Lorem aliquip veniam ex esse est consequat tempor eiusmod aliquip velit. Irure fugiat laborum ad voluptate. Ad voluptate nulla labore occaecat commodo. <br><br> Nostrud quis Lorem exercitation voluptate exercitation est cillum deserunt ea quis elit. Veniam tempor aute aliqua magna id adipisicing eu. Ipsum non consectetur elit id laborum fugiat velit enim deserunt aliqua adipisicing. Ut ex labore est ad ea. Tempor proident nostrud non eu enim sint ad enim minim irure ipsum esse tempor non. Velit ut irure occaecat non sunt dolore.",
    questions: [
      {
        type: "oneOf",
        question: "Ut officia officia et magna.",
        options: [
          "0",
          "01",
          "02",
          "023"
        ],
        answer: "0"
      },
      {
        type: "multipleOf",
        question: "Ut officia officia et magna.",
        options: [
          "0",
          "01",
          "012",
          "0123",
          "01234",
          "012345",
          "0123456"
        ],
        answer: ["01", "01234", "0123456"]
      },
      {
        type: "textQuest",
        question: "Commodo excepteur do mollit culpa mollit. Sunt reprehenderit occaecat excepteur id consequat aute pariatur do duis.",
        answer: "admin2"
      }
    ],
    maxMark: 9
  }
]

const types = { oneOf: 0, multipleOf: 0, textQuest: 0 }

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    docTitle: 'Express',
    variants: tests.map((obj, index) => {
      return {
        id: index + 1,
        title: obj.title,
        decription: obj.decription
      }
    })
  });
});

router.get("/test/:id", (req, res) => {
  const testID = req.params.id
  const test = tests[testID - 1]
  res.render("test", {
    title: test.title,
    docTitle: `Test ${testID}`,
    detailedDesc: test.detailedDesc,
    questions: test.questions.map(questionsShaffle)
  })
})

router.post("/result", (req, res) => {
  const usersAnswers = req.body, regex = new RegExp("oneOf_|textQuest_|multipleOf_", )
  console.log(usersAnswers);
  const test = tests[usersAnswers.title.split(" ")[1] - 1]
  let key = {}
  for (i of Object.keys(usersAnswers)) {
    key[i.replace(regex, "")] = i
  }
  let finalMark = 0
  for (i in test.questions) {
    if (!key[String(i)]) {
      continue
    }
    let usersAnswer = usersAnswers[key[String(i)]]
    if (test.questions[i].type == "multipleOf") {
      if (!(typeof usersAnswer === "object")) {
        usersAnswer = [usersAnswer]
      }
      if (!test.questions[i].answerMarkingSystem) {
        finalMark += tests[0].questions[1].answerMarkingSystem(usersAnswer.filter(element => test.questions[i].answer.includes(test.questions[i].options[Number(element.split("_")[1])])).length, test.questions[i].answer.length)
        continue
      }
      finalMark += test.questions[i].answerMarkingSystem(usersAnswer.filter(element => test.questions[i].answer.includes(test.questions[i].options[Number(element.split("_")[1])])).length, test.questions[i].answer.length)
    } else if (test.questions[i].type == "textQuest") {
      if (!test.questions[i].answerMarkingSystem) {
        finalMark += tests[0].questions[2].answerMarkingSystem(usersAnswer, test.questions[i].answer)
        continue
      }
      finalMark += test.questions[i].answerMarkingSystem(usersAnswer, test.questions[i].answer)
    } else {
      finalMark += test.questions[i].answer === test.questions[i].options[Number(usersAnswer.split("_")[1])]
    }
  }
  const percentResult = Math.round((finalMark * 100) / test.maxMark)
  res.render("result", { docTitle: "Your Results", title: usersAnswers.title, result: percentResult})
})

module.exports = router;
