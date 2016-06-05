/// <reference path="../typings/jquery/jquery.d.ts"/>
var Slackathon;
var http = require('http');
(function (Slackathon) {
    var DataManager = (function () {
        function DataManager() {
        }
        DataManager.retrieveChannels = function (token) {
            var channelCollection = new Slackathon.ChannelCollection();
            var baseUrl = "https://slack.com/api/channels.list?";
            var tokenParameter = "token=" + token;
            var finalUrl = baseUrl + tokenParameter;
            var ajaxSettings;
            ajaxSettings.type = "GET";
            ajaxSettings.dataType = "json";
            ajaxSettings.url = finalUrl;
            ajaxSettings.success = function (data) {
                // Parse JSON
                console.log(data);
            };
            jQuery.ajax(ajaxSettings);
            return channelCollection;
        };
        DataManager.retrieveUsers = function (token) {
            var userCollection = new Slackathon.UserCollection();
            var baseUrl = "https://slack.com/api/channels.list?";
            var tokenParameter = "token=" + token;
            var finalUrl = baseUrl + tokenParameter;
            var ajaxSettings;
            ajaxSettings.type = "GET";
            ajaxSettings.dataType = "json";
            ajaxSettings.url = finalUrl;
            ajaxSettings.success = function (data) {
                // Parse JSON
                console.log(data);
            };
            jQuery.ajax(ajaxSettings);
            return userCollection;
        };
        return DataManager;
    }());
    Slackathon.DataManager = DataManager;
})(Slackathon || (Slackathon = {}));
module.exports = Slackathon;
