/// <reference path="../typings/jquery/jquery.d.ts"/>
var Slackathon;
(function (Slackathon) {
    var Exercice = (function () {
        function Exercice() {
            this.repetition = Math.floor(Math.random() * this.maxRep) + this.minRep;
        }
        Exercice.prototype.toString = function () {
            return "Do " + this.repetition + " " + this.unit + " of " + this.name + " :)";
        };
        return Exercice;
    }());
    Slackathon.Exercice = Exercice;
})(Slackathon || (Slackathon = {}));
module.exports = Slackathon;
