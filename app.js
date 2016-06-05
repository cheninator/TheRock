var express = require('express');
var bodyParser = require('body-parser');
//global.jQuery = require('jquery');
//var theRock = require('./Scripts/TheRock/TheRock');
var DataManager = require('./DataManager');
var ex = require('./Exercice');
var rock = require('./TheRock');
//console.log(theRock.TheRock());
var first = require('./FirstOne');
console.log(first.test.f());
//first.test.booTimer();
//first.test.fooTimer();

var app = express();
var port = process.env.PORT || 1337;

// Requesting things...
//DataManager.DataManager.retrieveChannels('xoxb-48226578020-lO9sjDnXVj31tWFwCz4jU8Ip');
//DataManager.DataManager.retrieveUsers('xoxb-48226578020-lO9sjDnXVj31tWFwCz4jU8Ip');
//console.log(ex.Exercice.generateExercice(10,50,"running", "miles"));
rock.TheRock.retrieveChannels(function(err, res) {
    rock.TheRock.collectionChannel = res.body.channels;
    console.log('Main channels :' + rock.TheRock.collectionChannel);
    rock.TheRock.retrieveUsers(function(er, ress) {
	console.log('Main members :' + ress.body.members);
	rock.TheRock.collectionUser = ress.body.members;
	rock.TheRock.SendRandomExercice();
    });
});

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
	text : 'Hello ' + userName + ', welcome to Devdactic Slack channel! I\'ll be your guide.'
    };
    if (userName !== 'slackbot'){
	return res.status(200).json(botPayload);
    } else {
	return res.status(200).end();
    }
});


app.post('/done', function (req, res, next) {
    var userName = req.body.user_name;
    var personCompleted = req.body.text;
    if(userName !== personCompleted){
	rock.TheRock.FinishedTask(personCompleted);
    }
    
    var botPayload = {
	//text : 'Hello ' + userName + ', welcome to Devdactic Slack channel! I\'ll be your guide.'
	text : "This is my response"
    };
    // Loop otherwise..
    if (userName !== 'slackbot') {
	return res.status(200).json(botPayload);
    } else {
	return res.status(200).end();
    }
});


app.post('/challenge', function( req, res, next) {
    var userName = req.body.user_name;
    var information = req.body.text.split(" ");
    var personChallenged = information[0];
    var exercice = information[1];
    if(personChallenged === undefined || personChallenged === "")
	{
	    personChallenged = userName;
	}
    if(exercice !== undefined || exercice !== "")
    {
	rock.TheRoc.SendExerciceToUser(personChallenged,exercice);
    }
    


    rock.TheRock.SendRandomExerciceToUser(personChallenged);
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


//////////////////////////////////////////////////////
// app.post('/stat', function( req, res, next) {    //
//   						    //
//   						    //
// });						    //
// 						    //
// 						    //
// app.post('/shame', function( req, res, next) {   //
//   						    //
//     var text = req.body.text;		    //
// });						    //
// 						    //
// 						    //
// app.post('/success', function( req, res, next) { //
//   						    //
//   						    //
// });						    //
//////////////////////////////////////////////////////


