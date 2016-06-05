var request = require('superagent');
var ex = require('./Exercice')

exports.TheRock = { 
    token : "xoxb-48226578020-7oVuz7mbmKRwjs9yIHxFWGK3",
    exercice : [
	{
	    "id": 0,
	    "name": "pushups",
	    "minReps": 10,
	    "maxReps": 50,
	    "units": "reps"
	},
	{
	    "id": 1,
	    "name": "planks",
	    "minReps": 40,
	    "maxReps": 60,
	    "units": "seconds"
	},
	{
	    "id": 2,
	    "name": "wall-sit",
	    "minReps": 40,
	    "maxReps": 60,
	    "units": "seconds"
	},
	{
	    "id": 3,
	    "name": "chair-dips",
	    "minReps": 15,
	    "maxReps": 50,
	    "units": "reps"
	},
	{
	    "id": 4,
	    "name": "jumping-jacks",
	    "minReps": 20,
	    "maxReps": 40,
	    "units": "reps"
	}
    ],
    challengeCounter : 0,
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

    

    SendRandomExerciceToUser: function(userName) {
	var user;
	// Find the user id 
	for (var i = 0; i < this.collectionUser.length; i++){
	    if (this.collectionUser[i].name === userName){
		user = this.collectionUser[i];
		break;
	    }
	}
	// Check if the user doesn't already have a challenge
	for (var i = 0; i < this.challenge.length; i++){
	    if (this.challenge[i].user.name === user.name){
		console.log("User already challenged");
		var generalMessage = "<@" + this.challenge[i].user.name + ">" + "already has a challenge ";
		this.SendMessageToChannel(this.generalChannel.id, 
					  generalMessage);
		// abort
		return;
	    }
	}	

	var exercice = this.GenerateRandomExercice();
	//this.SendMessageTolUser(exercice.id, 'New exercice');
	this.SendInformation(user, exercice);
    },

   SendExerciceToUser: function(userName,exerciceName) {
       var user;
       var exercice;
	// Find the user id 
	for (var i = 0; i < this.collectionUser.length; i++){
	    if (this.collectionUser[i].name === userName){
		user = this.collectionUser[i];
		break;
	    }
	}
	for (var i = 0; i < this.exercice.length; i++){
	    if (this.exercice[i].name === exerciceName){
		exercice = this.exercice[i];
		break;
	    }
	}
	// Check if the user doesn't already have a challenge
	for (var i = 0; i < this.challenge.length; i++){
	    if (this.challenge[i].user.name === user.name){
		console.log("User already challenged");
		var generalMessage = "<@" + this.challenge[i].user.name + ">" + "already has a challenge ";
		this.SendMessageToChannel(this.generalChannel.id, 
					  generalMessage);
		// abort
		return;
	    }
	}	

	//this.SendMessageTolUser(exercice.id, 'New exercice');
	this.SendInformation(user, exercice);
    },
    SendRandomExercice: function() {
	var exercice = this.GenerateRandomExercice();
	var user = this.GenerateRandomUser();

	this.SendInformation(user,exercice);
    },
    SendInformation : function(user, exercice){
	var generalMessage = "<@" + user.id + ">" + " has a new challenge : "+ exercice.name + "  " + exercice.maxReps +" " + exercice.units;
	console.log("User with the challenge : " + user.name);
	for(var i = 0; i < this.collectionChannel.length; ++i)
	{
	    if(this.collectionChannel[i].name === "general")
		this.generalChannel = this.collectionChannel[i];
	}

        this.SendMessageToChannel(this.generalChannel.id, generalMessage);
	this.SendMessageToChannel(user.id, generalMessage);
	this.challenge.push(
	    {
		id : this.challengeCounter,
		exercice: exercice,
		user: user, 
		duree: 2,
		is_done: false
	    });
	var that = this;
	var val = this.challengeCounter;
	setTimeout(function(){
	    //console.log(that);
	    that.GetCompletion(val);
	},600000);
	this.challengeCounter += 1;

    },

    GetCompletion : function(id){
	console.log("GetCompletionElapsed : id is" + id);
	var i = this.challenge.length;
	while(i--){
	    if (this.challenge[i].id === id){
		console.log("Found the challenge");
		if (this.challenge[i].is_done === true){
		    var generalMessage = "Time is up : <@" + this.challenge[i].user.id + ">" + " has suceeded ";
		            this.SendMessageToChannel(this.generalChannel.id, 
						     generalMessage);
		} else {
		    var generalMessage = "Time is up : <@" + this.challenge[i].user.id + ">" + " has failed ";
		            this.SendMessageToChannel(this.generalChannel.id, 
						     generalMessage);   
		}
		// Remove the challenge from the queue
		this.challenge.splice(i,1);
	    }
	}

	// Restart the lottery
	this.SendRandomExercice();
	
    },
    
    FinishedTask : function(username){
	console.log("Finished task invoked with : " + username);
	for (var i = 0; i < this.challenge.length; i++){
	    if (this.challenge[i].user.name === username){
		console.log("Found the challenge");
		this.challenge[i].is_done = true;
		var generalMessage = "<@" + this.challenge[i].user.name + ">" + " has completed the challenge. ";
		this.SendMessageToChannel(this.generalChannel.id, 
					  generalMessage);
		
	    }
	}
	var i = this.challenge.length;
	while(i--){
	    if (this.challenge[i].user.name === username){
		console.log("Found the challenger and am removing it");
		// Remove the challenge from the queue
		this.challenge.splice(i,1);
	    }
	}
    }
}
