var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let regex = /:.+\./g
  if (!req.cookies["connect.sid"]) {
    res.render("errorAuth")
    return ""
  }
  if (req.cookies["connect.sid"].match(regex)[0] != `:${req.sessionID}.`) {
    console.log(123);
    res.render("errorAuth");
  }else {
    res.render('index', { title: 'Main' });
  }
});

module.exports = router;
