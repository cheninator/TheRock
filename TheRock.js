var request = require('superagent');
var ex = require('./Exercice')

exports.TheRock = {
    token : "xoxb-47479903523-gaLKyAXynsBsCEWWuqyW2Gt0",
    exercice : [
	{
	    "id": 0,
	    "name": "pushups",
	    "minReps": 10,
	    "maxReps": 50,
	    "units": "rep"
	},
	{
	    "id": 1,
	    "name": "planks",
	    "minReps": 40,
	    "maxReps": 60,
	    "units": "second"
	},
	{
	    "id": 2,
	    "name": "wall sit",
	    "minReps": 40,
	    "maxReps": 60,
	    "units": "second"
	},
	{
	    "id": 3,
	    "name": "chair dips",
	    "minReps": 15,
	    "maxReps": 50,
	    "units": "rep"
	},
	{
	    "id": 4,
	    "name": "jumping jacks",
	    "minReps": 20,
	    "maxReps": 40,
	    "units": "rep"
	}
    ],
    collectionUser: [],
    collectionChannel: [],
    challenge: [],
    generalChannel: {},
    retrieveChannels : function (callback) {
        var baseUrl = "https://slack.com/api/channels.list";
        console.log('Token is : ' + this.token);
	request.get(baseUrl).query(
	    {
		token : this.token 
	    }).end(function(err,res){
		//console.log(res.body.channels);
		callback(err, res);
	    });

	console.log("retrieveChannelsDone?");
    },
    retrieveUsers : function (callback) {
        var baseUrl = "https://slack.com/api/users.list";
	console.log('Token is : ' + this.token);
	request.get(baseUrl).query(
	    {
		token : this.token 
	    }).end(function(err,res){
		this.collectionUser = res.body.members;
		//console.log(this.collectionUser);
		callback(err, res);
	    });

	console.log("retrieveUsersDone?");
    },
    SendMessageToChannel : function(channelId, text){
	
	console.log('SEND id ' + channelId);
	var baseUrl = "https://slack.com/api/chat.postMessage";
	request.get(baseUrl).query(
	    {
		token : this.token,
		channel: channelId,
		text: text,
		as_user: true,
		userName: 'the-rock'
		
	    }).end(function(err,res){

	    });
	
    },
    GenerateRandomExercice: function() {
	return this.exercice[Math.floor(Math.random() * this.exercice.length)];
    },
    GenerateRandomUser : function() {
	var user;

        user = this.collectionUser[Math.floor(Math.random() * this.collectionUser.length)];
        while (user.is_bot || user.name === "slackbot") {
            user = this.collectionUser[Math.floor(Math.random() * this.collectionUser.length)];
        }
        return user;
    },
    SendRandomExerciceToUser: function(userId) {
	var exercice = this.GenerateRandomExercice();
	this.SendMessageTolUser(exercice.id, 'New exercice');
    },
    SendRandomExercice: function() {
	var exercice = this.GenerateRandomExercice();
	var user = this.GenerateRandomUser();

	this.SendMessageToChannel(user.id, 'New exercice');
	this.challenge.push(
	    {
		exercice: exercice,
		user: user, 
		duree: 2,
		is_done: false;
	    });
	var generalMessage = "<@" + user.id + ">" + " has a new challenge : ";
	
	for(var i = 0; i < this.collectionChannel.length; ++i)
	{
	    if(this.collectionChannel[i].name === "general")
		this.generalChannel = this.collectionChannel[i];
	}

        this.SendMessageToChannel(this.generalChannel.id, generalMessage);
	
    }
}
