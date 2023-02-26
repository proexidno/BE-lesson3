var express = require('express');
const session = require('express-session');
var router = express.Router();
var fs = require("fs")

/* GET users listing. */
router.post('/LogIn', function (req, res, next) {
    const users = JSON.parse(fs.readFileSync("./modules/users.json"))
    const { login, password } = req.body
    if (!(login != "" && password != "")) {
        res.send("All input mustn't be empty")
    }
    if (req.session.autentificated) {
        res.send("Already autentificated")
    } else {
        if (Object.keys(users).includes(login) && password == users[login].password) {
            req.session.autentificated = true
            req.session.user = {
                login,
                username: users[login].username
            }
            res.send("Succesfuly authenticated")
        } else if (password == users[login].password) {
            res.send("User does not exist")
        } else {
            res.send("Wrong password")
        }
    }
});

router.post('/registration', function (req, res, next) {
    let users = JSON.parse(fs.readFileSync("./modules/users.json"))
    const { login, password, username } = req.body
    if (!(login != "" && password != "" && username != "")) {
        res.send("All input mustn't be empty")
    }
    if (req.session.autentificated) {
        res.send("Already autentificated")
    } else {
        console.log();
        if (Object.keys(users).includes(login)) {
            res.send("this login already exists")
        } else {
            users[login] = { username, password }
            fs.writeFileSync("./modules/users.json", JSON.stringify(users))
            req.session.autentificated = true
            req.session.user = {
                login, username
            }
            res.send("Succesfuly authenticated")
        }
    }
});

module.exports = router;