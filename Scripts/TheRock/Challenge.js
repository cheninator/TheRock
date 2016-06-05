/// <reference path="../typings/jquery/jquery.d.ts"/>
var Slackathon;
(function (Slackathon) {
    var Challenge = (function () {
        function Challenge(exercice, user, duree) {
            var _this = this;
            this.exercice = exercice;
            this.user = user;
            this.isDone = false;
            this.timeoutId = setInterval(function () {
                Slackathon.TheRock.getInstance().onChallengeTimeout(_this);
            }, duree * 60 * 1000);
        }
        return Challenge;
    }());
    Slackathon.Challenge = Challenge;
})(Slackathon || (Slackathon = {}));
module.exports = Slackathon;
