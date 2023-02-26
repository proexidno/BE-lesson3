var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('logIn', { title: 'LogIn' });
});

module.exports = router;
