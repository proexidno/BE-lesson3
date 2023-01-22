var express = require('express');
var router = express.Router();

function arrContainsObjectWithKeys(values, list) {
  console.log();
  for (let object of list){
    console.log(Object.values(object));
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
  if (users[UsersLogin] && users[UsersLogin] == UsersPasswod) {
    res.send("Форма отправленна")
  }else{
    res.send("Такого пользователя не существует")
  }
});

router.post('/testSignUp', function (req, res, next) {
  let newUsersLogin = req.body.login
  let newUsersPasswod = req.body.password
  users[newUsersLogin] = newUsersPasswod
  res.send("Форма отправленна")
});

router.get("/daysTillBirthday", function (req, res, next) {
  let list = req.query.date.split(".");
  list.reverse();
  list[0] = String(Number(list[0]) + 1)
  let birthDate = new Date(list.join("-"))
  console.log(Math.floor((birthDate - new Date()) / 1000 / 60 / 60 / 24));
  res.send("Форма отправленна")
})

router.get("/dayOfTheWeek", function (req, res, next) {
  let date = new Date(req.query.Year, req.query.Month, req.query.Day)
  var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  res.send(`День недели: ${days[date.getDate()]}`)
})

router.post('/testSignUp', function (req, res, next) {
  let newUsersLogin = req.body.login
  let newUsersPasswod = req.body.password
  users[newUsersLogin] = newUsersPasswod
  res.send("Форма отправленна")
});

router.get("/react-test", function (req, res, next) {
  res.send("Succesful test")
})

router.get("/react-test/:id", function (req, res, next) {
  res.send(req.params.id)
})

module.exports = router;
