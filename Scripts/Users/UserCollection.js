/// <reference path="../typings/jquery/jquery.d.ts"/>
var Slackathon;
(function (Slackathon) {
    var UserCollection = (function () {
        function UserCollection() {
        }
        UserCollection.prototype.getUserById = function (id) {
            var result;
            for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                if (user.id === id) {
                    result = user;
                }
            }
            return result;
        };
        UserCollection.prototype.getUserByName = function (name) {
            var result;
            for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                if (user.name === name) {
                    result = user;
                }
            }
            return result;
        };
        return UserCollection;
    }());
    Slackathon.UserCollection = UserCollection;
})(Slackathon || (Slackathon = {}));
