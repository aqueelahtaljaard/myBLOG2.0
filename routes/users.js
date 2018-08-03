var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /* GET login */
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });
//
// router.post('/login', function(req, res, next){
//
//   var name = req.body.username;
//   var password = req.body.password;
//
//   console.log(name);
//   console.log("hello");
//
// });

module.exports = router;
