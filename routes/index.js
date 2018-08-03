var express = require('express');
var router = express.Router();

//can import code directly from file
var posts = require('../db.json');
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'Home',posts: posts.posts});
});

/* GET all blog posts page. */
router.get('/posts', function(req, res, next) {
  res.render('posts', { title: 'Posts',posts: posts.posts });
});


/* GET contact us page. */
router.get('/contact', function(req, res, next) {
  res.render('contact',{title:'Contact'});
});


// Get signup page
router.get('/signup', function(req, res, next) {
    res.render('signup',{title:'signup'});
});

/* post  signup page. */
router.post('/signup', function(req, res, next) {
  //gets last user id then adds 1, giving higher id
  var id = posts.users[posts.users.length-1].id + 1;

  //creates variable to posts
  var obj = {
    "username": req.body.username,
    "email": req.body.email,
    "password": req.body.password,
    "passwordRepeat": req.body.passwordRepeat,
  }

   //saves data

   request.post({
     url:'http://localhost:8000/users',
     body:obj,
     json:true
   },function(error, responsive,body){
     res.redirect('/')
   });
});


// get login page
router.get('/login', function(req, res, next) {
    console.log("Get succesful");
    res.render('login', {title: "login", users:posts.users, message: false});
});

/* post login page. */
router.post('/login', function(req, res, next) {
  var users = posts.users;
  console.log(users);

  var username = req.body.username;
  var password = req.body.password;
  console.log("Username: "+username);

  for(let i in users){
     console.log(username);
     if(username == users[i].username && password == users[i].password){
      res.render('index',{title:'Home', posts: posts.posts});
    }
  }
 res.render('login', {title: "login", message: "Username or password incorrect"});
});

/* GET Edit Page. */
router.get('/edit/:id', function(req, res, next) {
  var id;
  var post = posts.posts;

  for(var i = 0; i < post.length; i++){
    if(post[i].id == req.params.id){
      id = i;
    }
  }


  res.render('edit',{
    title:'Edit Page',
    posts : posts.posts,
    id : id,
});
});

router.post("/edit/:id", function(req, res, next){
  console.log(req.params.id);
  request({
    url:"http://localhost:8000/posts/"+req.params.id,
    method:"PATCH",
    form:{
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
    },
    function(error,response,body){
      // res.redirect("/");
      res.render("index",{message:"successfully added"});
    }
  })
  res.redirect("/");
})

/* GET new post. */
router.get('/new', function(req, res, next) {
  res.render('new',{title:'New Post'});
});


/* GET delete post. */
router.get('/delete/:id', function(req, res, next) {
    request({
      url:"http://localhost:8000/posts/"+req.params.id,
      method:"DELETE",
      function(error,response,body){
        res.render("index",{message:"successfully added"});
      }
    })
    res.redirect("/");
});

/* GET view page. */
router.get('/view/:id', function(req, res, next) {
    request({
      url:"http://localhost:8000/posts/"+req.params.id,
      method:"GET",
    },  function(error,response,body){
        res.render("view", {posts:JSON.parse(body)});
    })
});


/* POST new page. */
router.post('/new', function(req, res, next) {
  // res.send(req.body)


// create variable to posts
let obj ={
  "title": req.body.title,
  "author": req.body.author,
  "datetime": req.body.datetime,
  "briefcontent": req.body.briefcontent,
  "content": req.body.content,

}
  //write logic that saves this data
  request.post({
    url:"http://localhost:8000/posts",
    body: obj,
    json: true
  }, function(error , response, body){
    //what to send when function has finished
    // res.redirect('/');
    res.redirect('/');
  });

  // console.log(req.body);
});

module.exports = router;
