var express = require('express');
var router = express.Router();


function questionsShaffle(question) {
  let { type } = question
  if (type.textQuest) {
    return {
      ID: question.ID,
      type: question.type,
      question: question.question
    }
  }
  let { options } = question
  // options.sort(() => Math.random() - 0.5);
  return {
    ID: question.ID,
    type: question.type,
    question: question.question,
    options: options
  }
}

const tests = [
  {
    title: "123",
    decription: "Dolor id amet id occaecat exercitation commodo adipisicing deserunt culpa veniam aliquip eu incididunt. Quis commodo aute ex aliquip excepteur dolor. Ea eiusmod adipisicing enim enim quis anim labore tempor ad esse. Aute laborum ut magna consequat magna proident labore id.",
    detailedDesc: "Mollit minim nisi sint deserunt elit sunt amet eu culpa. Laboris aliquip amet commodo ex laborum enim eu duis fugiat culpa nulla consequat qui labore. Et ea incididunt magna enim aute aute dolore adipisicing veniam. Ad sunt qui culpa eu reprehenderit. <br><br> Elit dolore ea quis ea proident quis ad dolor. Reprehenderit anim velit sit mollit cupidatat ipsum ullamco mollit eu eiusmod sunt. Officia ea cupidatat officia voluptate eu ullamco ex do ad aliquip Lorem nisi mollit magna. Anim labore commodo exercitation velit quis. Nisi cillum adipisicing esse tempor cupidatat do nostrud veniam duis exercitation. Voluptate cillum elit incididunt cupidatat anim aute ad dolore ut. Laborum eiusmod cillum laboris sit aute elit Lorem est deserunt pariatur aute non exercitation.",
    questions: [
      {
        ID: 0,
        type: { oneOf: 1, multipleOf: 0, textQuest: 0 },
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
        ID: 1,
        type: { oneOf: 0, multipleOf: 1, textQuest: 0 },
        question: "Ut officia officia et magna.",
        options: [
          "1",
          "12",
          "123",
          "1234",
          "12345",
          "123456"
        ],
        answer: ["1", "123"]
      },
      {
        ID: 2,
        type: { oneOf: 0, multipleOf: 0, textQuest: 1 },
        question: "Commodo excepteur do mollit culpa mollit. Sunt reprehenderit occaecat excepteur id consequat aute pariatur do duis.",
        answer: "admin"
      }
    ]
  },
  {
    title: "12345",
    decription: "Dolor id amet id occaecat exercitation commodo adipisicing deserunt culpa veniam aliquip eu incididunt. Quis commodo aute ex aliquip excepteur dolor. Ea eiusmod adipisicing enim enim quis anim labore tempor ad esse. Aute laborum ut magna consequat magna proident labore id.",
    detailedDesc: "Laborum commodo sit ullamco labore pariatur nulla officia incididunt enim. Magna quis anim labore aliqua proident deserunt voluptate nulla id laborum. Sit Lorem aliquip veniam ex esse est consequat tempor eiusmod aliquip velit. Irure fugiat laborum ad voluptate. Ad voluptate nulla labore occaecat commodo. <br><br> Nostrud quis Lorem exercitation voluptate exercitation est cillum deserunt ea quis elit. Veniam tempor aute aliqua magna id adipisicing eu. Ipsum non consectetur elit id laborum fugiat velit enim deserunt aliqua adipisicing. Ut ex labore est ad ea. Tempor proident nostrud non eu enim sint ad enim minim irure ipsum esse tempor non. Velit ut irure occaecat non sunt dolore.",
    questions: [
      {
        id: 1,
        type: { oneOf: 1, multipleOf: 0, textQuest: 0 },
        question: "Ut officia officia et magna.",
        options: [
          "0",
          "02",
          "023",
          "0234"
        ],
        answer: "1"
      },
      {
        id: 2,
        type: { oneOf: 0, multipleOf: 1, textQuest: 0 },
        question: "Ut officia officia et magna.",
        options: [
          "01",
          "012",
          "0123",
          "01234",
          "012345",
          "0123456"
        ],
        answer: ["1", "123"]
      },
      {
        id: 3,
        type: { oneOf: 0, multipleOf: 0, textQuest: 1 },
        question: "Commodo excepteur do mollit culpa mollit. Sunt reprehenderit occaecat excepteur id consequat aute pariatur do duis.",
        answer: "admin2"
      }
    ]
  }
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
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
  let testID = req.params.id
  let test = tests[testID - 1]
  res.render("test", {
    title: `test${testID}`,
    detailedDesc: test.detailedDesc,
    questions: test.questions.map(questionsShaffle)
  })
})

router.post("/results", (req, res) => {
  let answers = req.body
  console.log(answers);
  res.render("results", {title: "Your Results", result: 123})
})
module.exports = router;
