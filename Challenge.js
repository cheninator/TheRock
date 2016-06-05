var exercice = require('exercice');
exports.Challenge = {
    var Challenge = (function() {
	function(Exercice, user, duree){
	    var _this = this;
            this.exercice = exercice;
            this.user = user;
            this.isDone = false;
            this.timeoutId = setInterval(function () {
                onChallengeTimeout(_this);
            }, duree * 60 * 1000);
	}
	return Challenge;
    }());
}
