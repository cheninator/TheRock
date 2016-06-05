/// <reference path="../typings/jquery/jquery.d.ts"/>
var Slackathon;
(function (Slackathon) {
    var ChannelCollection = (function () {
        function ChannelCollection() {
        }
        ChannelCollection.prototype.getChannelById = function (id) {
            var result;
            for (var _i = 0, _a = this.channels; _i < _a.length; _i++) {
                var channel = _a[_i];
                if (channel.id === id) {
                    result = channel;
                }
            }
            return result;
        };
        ChannelCollection.prototype.getChannelByName = function (name) {
            var result;
            for (var _i = 0, _a = this.channels; _i < _a.length; _i++) {
                var user = _a[_i];
                if (user.name === name) {
                    result = user;
                }
            }
            return result;
        };
        return ChannelCollection;
    }());
    Slackathon.ChannelCollection = ChannelCollection;
})(Slackathon || (Slackathon = {}));
