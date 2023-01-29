var express = require('express');
var router = express.Router();

function arrContainsObjectWithKeys(values, list) {
  for (let object of list){
    if (values == Object.values(object)) {
      return true
    }
  }
  return false
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  res.send("test")
});

let users = {'admin': "qwerty123"}

router.post('/testLogIn', function (req, res, next) {
  let UsersLogin = req.body.login
  let UsersPasswod = req.body.password
  console.log(UsersLogin, UsersPasswod);
  if (users[UsersLogin] && users[UsersLogin] == UsersPasswod) {
    res.send("Вы вошли")
  }else{
    res.send("Такого пользователя не существует")
  }
});

router.post('/testSignUp', function (req, res, next) {
  let newUsersLogin = req.body.login
  let newUsersPasswod = req.body.password
  users[newUsersLogin] = newUsersPasswod
  res.send("Вы зарегестрированны")
});

router.post("/daysTillBirthday", function (req, res, next) {
  let list = req.body.date.split(".");
  list.reverse();
  list[0] = String(Number(list[0]) + 1)
  let birthDate = new Date(list.join("-"))
  res.send(`Осталось ${Math.floor((birthDate - new Date()) / 1000 / 60 / 60 / 24)} дней до вашего дня рождения`)
})

router.post("/dayOfTheWeek", function (req, res, next) {
  let date = new Date(req.body.Year, req.body.Month, req.body.Day)
  var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  res.send(`День недели: ${days[date.getDate()]}`)
})

router.post("/isPifTriangle", function (req, res, next) {
  let sqaredSides = Object.values(req.body).map((val) => val ** 2);
  sqaredSides.sort((val1, val2) => {val1 > val2 ? val1 : val2})
  if (!(sqaredSides[2] - sqaredSides[0] - sqaredSides[1])) {
    res.send("3 стороны треугольника Пифагора")
  }else {
    res.send("Не 3 стороны треугольника Пифагора")
  }
})

router.post("/isSquareEquation", function (req, res, next) {
  let coeffecients = Object.values(req.body).map(Number);
  let discriminant = coeffecients[1] ** 2 - 4 * coeffecients[0] * coeffecients[2]
  if (discriminant < 0){
    res.send("Нет решений");
  }else if (discriminant == 0){
    res.send(String((-coeffecients[1]) / (coeffecients[0])));
  } else{
    res.send(([1, -1].map((plusMinus) => (-coeffecients[1] + discriminant ** (1/2) * plusMinus) / (coeffecients[0]))).join(" "));
  };
})

router.post("/commonDenominators", function (req, res, next) {
  let nums = Object.values(req.body).map(Number);
  let answ = []
  for (let i = 2; i <= Math.min(...nums); i++){
    console.log(i);
    if (Number.isInteger(Math.max(...nums) / i) && Number.isInteger(Math.min(...nums) / i)) {
      answ.push(i)
    }
  }
  res.send(answ.join(" "))
})

router.post("/denominators", function (req, res, next) {
  let { num } = req.body
  answ = []
  for (let i = 2; i < num; i++){
    if (Number.isInteger(num / i)) answ.push(i)
  }
  res.send(answ.join(" "))
})

router.post("/totalWords", function (req, res, next) {
  let { text } = req.body
  console.log(text);
  let splited = text.split(" ")
  let wordsCount = splited.length
  let charCount = splited.join("").split("").length
  console.log(wordsCount, charCount);
  res.send([wordsCount, charCount].map(String).join(" "))
})

router.post("/totalSymbols", function (req, res, next) {
  let { text } = req.body
  let counts = ""
  let compressed = text.split(" ").join("").split("")
  let chars = new Set(compressed)
  for (char of chars){
    counts += `${char}: ${100 * (compressed.filter((val) => val == char).length / compressed.length)}% `
  }
  console.log(counts);
})

router.get("/react-test", function (req, res, next) {
  res.send("Succesful test")
})

router.get("/react-test/:id", function (req, res, next) {
  res.send(req.params.id)
})

module.exports = router;
