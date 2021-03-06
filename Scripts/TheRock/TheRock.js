/// <reference path="../typings/jquery/jquery.d.ts"/>
var Slackathon;
var http = require('http');
var DataManager = require('./DataManager');

(function (Slackathon) {
    var TheRock = (function () {
        function TheRock() {
            this.token = "xoxb-47479903523-gaLKyAXynsBsCEWWuqyW2Gt0";
            var jsonPath = "../Data/exercises.json";
            //jQuery.getJSON(jsonPath, function (data) {
            //    // TO DO: FUCKING PARSE JSON
            //    var parsed = JSON.parse(data);
            //});
	    console.log(DataManager);
            this.channelCollection = DataManager.retrieveChannels(this.token);
            this.userCollection = DataManager.retrieveUsers(this.token);
            this.generalChannel = this.channelCollection.getChannelByName("general");
            this.challenges = new Array();
        }
        TheRock.getInstance = function () {
            if (TheRock.rock === null || TheRock.rock === undefined) {
                TheRock.rock = new TheRock();
            }
            return TheRock.rock;
        };
        TheRock.prototype.sendMessageToChannel = function (channelId, text) {
            var mhost = "https://slack.com/";
	    var mpath = "/api/chat.postMessage?";
	    var baseUrl = "https://slack.com/api/chat.postMessage?";
            var tokenParameter = "token=" + this.token;
            var channelParameter = "&channel=" + channelId;
            var textParameter = "&text=" + text;
            var asUserParameter = "&as_user=true";
            var usernameParameter = "&username=the-rock";
	    var mparameters = tokenParameter + channelParameter + textParameter + asUserParameter + usernameParameter;
            //var finalUrl = baseUrl + tokenParameter + channelParameter + textParameter + asUserParameter + usernameParameter;
            //var ajaxSettings;
            //ajaxSettings.type = "GET";
            //ajaxSettings.dataType = "json";
            //ajaxSettings.url = finalUrl;
            //ajaxSettings.success = function (data) {
            //    // Parse JSON
            //    console.log(data);
            //};
            //jQuery.ajax(ajaxSettings);

	    var options = {
		host: mhost,
		port: 80,
		path: mpath,
		method: 'GET',
		headers : {
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Content-Length': post_data.length
		}
	    };
	    
	    var req = http.request(options, function(res) {
		console.log(res);
	    });

	    req.write(mparameters);
	    req.end();

        };
        TheRock.prototype.sendMessageToUser = function (channelId, text) {
            this.sendMessageToUser(channelId, text);
        };
        TheRock.prototype.generateRandomExercice = function () {
            return this.exercices[Math.floor(Math.random() * this.exercices.length)];
        };
        TheRock.prototype.generateRandomUser = function () {
            var user;
            user = this.userCollection[Math.floor(Math.random() * this.userCollection.users.length)];
            while (user.isBot || user.name === "slackbot") {
                user = this.userCollection[Math.floor(Math.random() * this.userCollection.users.length)];
            }
            return user;
        };
        TheRock.prototype.sendRandomExerciceToUser = function (userId) {
            var exercice = this.generateRandomExercice();
            this.sendMessageToUser(userId, exercice.toString());
        };
        TheRock.prototype.sendRandomExercice = function () {
            var exercice = this.generateRandomExercice();
            var user = this.generateRandomUser();
            this.sendRandomExerciceToUser(user.id);
            var challenge = new Slackathon.Challenge(exercice, user, 2);
            this.challenges.push(challenge);
            var generalMessage = "<@" + user.id + ">" + " has a new challenge : " + exercice.toString();
            this.sendMessageToChannel(this.generalChannel.id, generalMessage);
        };
        TheRock.prototype.onChallengeTimeout = function (challenge) {
            if (challenge.isDone === false) {
                var generalMessage = "<@" + challenge.user.id + ">" + "​* has failed his challenge*​ : " + challenge.exercice.name;
                this.sendMessageToChannel(this.generalChannel.id, generalMessage);
            }
            else {
                var message = "<@" + challenge.user.id + ">" + "​* has succeeded his challenge*​ : " + challenge.exercice.name;
                this.sendMessageToChannel(this.generalChannel.id, message);
                for (var i = 0; i < this.challenges.length; ++i) {
                    if (this.challenges[i] === challenge) {
                        this.challenges.splice(i, 1);
                    }
                }
            }
        };
        return TheRock;
    }());
    Slackathon.TheRock = TheRock;
})(Slackathon || (Slackathon = {}));
module.exports = Slackathon;
