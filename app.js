var express = require('express');
var bodyParser = require('body-parser');
 
var first = require('./FirstOne');
console.log(first.test.f());
first.test.booTimer();
first.test.fooTimer();

var app = express();
var port = process.env.PORT || 1337;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!'); });
app.get('/sup', function (req, res) { res.status(200).send('Sup'); });
app.listen(port, function () {
  console.log('Listening on port ' + port);
});

app.post('/hello', function (req, res, next) {
  console.log(req.body);
  var userName = req.body.user_name;
  var botPayload = {
    //text : 'Hello ' + userName + ', welcome to Devdactic Slack channel! I\'ll be your guide.'
    text : req.body.token	
  };
  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});


app.post('/booty', function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    //text : 'Hello ' + userName + ', welcome to Devdactic Slack channel! I\'ll be your guide.'
    text : req.body	
  };
  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});


app.post('/done', function( req, res, next) {
  
  var validatedUser = req.body.text;
});


app.post('/stat', function( req, res, next) {
  
  
});


app.post('/shame', function( req, res, next) {
  
    var text = req.body.text;
});


app.post('/success', function( req, res, next) {
  
  
});

app.post('/challenge', function( req, res, next) {
  
    var challengeString = req.body.text;
    // Parse the challenge string
    var challengeInformation;
    
    

});



console.log("Hey");
