/// <reference path="../typings/jquery/jquery.d.ts"/>

module Slackathon {

    class Map<T> {
        private items: { [key: Challenge]: T };

        constructor() {
            this.items = {};
        }

        add(key: string, value: T): void {
            this.items[key] = value;
        }

        has(key: string): boolean {
            return key in this.items;
        }

        get(key: string): T {
            return this.items[key];
        }
    }

    export class TheRock {
        private token: string;
        public channelCollection: ChannelCollection;
        public userCollection: UserCollection;
        public generalChannel: Channel;
        static rock: TheRock;
        public challenges: Array<Challenge> ;
        public exercices: Array<Exercice>;

        constructor() {
            this.token = "xoxb-47479903523-gaLKyAXynsBsCEWWuqyW2Gt0";

            var jsonPath = "../Data/exercises.json";
            jQuery.getJSON(jsonPath, (data) => {

                // TO DO: FUCKING PARSE JSON
                var parsed = JSON.parse(data);
            });

            this.channelCollection = DataManager.retrieveChannels(this.token);
            this.userCollection = DataManager.retrieveUsers(this.token);
            this.generalChannel = this.channelCollection.getChannelByName("general");
            this.challenges = new Array<Challenge>();
        }

        static getInstance(): TheRock {
            if (TheRock.rock === null || TheRock.rock === undefined) {
                TheRock.rock = new TheRock();
            }
            return TheRock.rock;
        }

        sendMessageToChannel(channelId: string, text: string) {

            var baseUrl = "https://slack.com/api/chat.postMessage?";
            var tokenParameter = "token=" + this.token;
            var channelParameter = "&channel=" + channelId;
            var textParameter = "&text=" + text;
            var asUserParameter = "&as_user=true";
            var usernameParameter = "&username=the-rock";

            var finalUrl = baseUrl + tokenParameter + channelParameter + textParameter + asUserParameter + usernameParameter;

            var ajaxSettings: JQueryAjaxSettings;
            ajaxSettings.type = "GET";
            ajaxSettings.dataType = "json";
            ajaxSettings.url = finalUrl;
            ajaxSettings.success = (data) => {
                // Parse JSON
                console.log(data);
            }

            jQuery.ajax(ajaxSettings);
        }

        sendMessageToUser(channelId: string, text: string) {
            this.sendMessageToUser(channelId, text);
        }

        generateRandomExercice(): Exercice {
            return this.exercices[Math.floor(Math.random() * this.exercices.length)];
        }

        generateRandomUser(): User {
            var user: User;
            user = this.userCollection[Math.floor(Math.random() * this.userCollection.users.length)];

            while(user.isBot || user.name === "slackbot") {
                user = this.userCollection[Math.floor(Math.random() * this.userCollection.users.length)];
            }
            return user;
        }

        sendRandomExerciceToUser(userId: string) {
            var exercice = this.generateRandomExercice();
            this.sendMessageToUser(userId, exercice.toString());
        }

        sendRandomExercice() {
            var exercice = this.generateRandomExercice();
            var user = this.generateRandomUser();
            this.sendRandomExerciceToUser(user.id);
            var challenge = new Challenge(exercice, user, 2);

            this.challenges.push(challenge);

            var generalMessage = "<@" + user.id + ">" + " has a new challenge : " + exercice.toString();
            this.sendMessageToChannel(this.generalChannel.id, generalMessage);
        }

        onChallengeTimeout(challenge: Challenge) {
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

        }
    }
}