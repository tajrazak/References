var express = require('express'),
  app = express(),
  ejs = require('ejs'),
  bodyparser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  findUserDataCtrl = require('./controllers/FindUserDataCtrl.js'),
  checkForSessionCtrl = require('./controllers/CheckForSession.js'),
  savePostCtrl = require('./controllers/SavePostCtrl.js'),
  postSchema = require('./model/postschema.js'),
  userSchema = require('./model/userschema.js'),
  getPostCtrl = require('./controllers/getPostCtrl.js'),
  getPostContentOnload = require('./controllers/getPostContentCtrl.js'),
  dbConnection = require('./config/mongoconnect.js'),
  saveComments = require('./controllers/SaveCommentsCtrl.js'),
  http = require('http').Server(app),
  io = require('socket.io')(http);



app.use(express.static(__dirname + '/config'))
app.use(express.static(__dirname + '/controllers'))
app.use(express.static(__dirname + '/helpers'))
app.use(express.static(__dirname + '/model'))
app.use(express.static(__dirname + '/public/css'))
app.use(express.static(__dirname + '/public/fonts'))
app.use(express.static(__dirname + '/public/images'))
app.use(express.static(__dirname + '/public/js'))
app.use(express.static(__dirname + '/public/js/controllers'))
app.use(express.static(__dirname + '/public/js/directives'))
app.use(express.static(__dirname + '/public/js/services'))

app.use(express.static(__dirname + '/public/lib'))

app.use(express.static(__dirname + '/services'))
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/views/templates'))

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'itsSecret',
  resave: false,
  saveUninitialized: true,

}))


app.use(bodyparser.json());
app.get('/', function (req, res) {

  res.render('index.ejs', {
    somePage: "landingPage.html"
  })
  res.end()
})

app.get('/checkForSession', checkForSessionCtrl)

app.post('/getData', findUserDataCtrl)

app.post('/postContent', savePostCtrl)

app.post('/postContent', getPostCtrl)

app.post('/getPostContent', getPostContentOnload)

app.post('/postComments', saveComments)


app.post('/storeLike', function (req, res) {
  dbConnection.connect();

  postSchema.findOne({ //change here...................not updating save it
    _id: req.body._id
  }, function (err, resultdata) {

    if (!err) {
      //console.log(post);
      statusobj = resultdata.likes.filter(function (e) {
        return e === req.session.profilename
      })
      console.log(statusobj)

      if (statusobj.length === 0) {
        resultdata.likes.push(req.session.profilename)
        console.log("pushed")
      }

      resultdata.save(function (err, data) {
        if (err) {

          console.log(err);
          res.send();
        } else {
          console.log("saved");
          res.send(data);
        }
        dbConnection.close();
      });
    }
  });

});


app.post('/removeLike', function (req, res) {
  dbConnection.connect();

  postSchema.findOne({ //change here...................not updating save it
    _id: req.body._id
  }, function (err, resultdata) {

    if (!err) {
      //console.log(post);
      resultdata.likes.pop(req.session.profilename);

      resultdata.save(function (err, data) {
        if (err) {

          console.log(err);
          res.send();
        } else {
          console.log("removed");
          res.send(data);
        }
        dbConnection.close();
      });
    }
  });

});

io.on('connection', function (socket) {

  socket.on('updatePostWall', function (msg) {

    console.log(msg)

    socket.broadcast.emit('updatePost', msg);

  })


})





app.post('/newUser', function (request, response, next) {

  dbConnection.connect()


  userSchema.findOne({
    email: request.body.email
  }, function (err, data) {

    if (err) {

      console.log(err);
    }
    if (data === null) {

      next()
    } else {
      console.log("user already registered");
      response.send(false)
      dbConnection.close();
    }

  })

})
app.post('/newUser', function (request, response) {

  console.log("moving to registration");
  var users = new userSchema({
    profilename: request.body.Name,
    email: request.body.email,
    password: request.body.password1,
    gender: request.body.gender
  })
  users.save(function (err, data) {
    if (err) {

      console.log(err);
    } else {

      console.log(data);
      dbConnection.close();
      response.send(true)

    }

  })

})



app.get('/logout', function (req, res) {

  req.session.destroy();
  res.redirect('/');

})









http.listen(3000, function () {

  console.log("listing on port 3000");
});