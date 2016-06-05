
/// <reference path="../typings/jquery/jquery.d.ts"/>

module Slackathon {

    export class DataManager {
        static retrieveChannels(token: string): ChannelCollection {
            var channelCollection = new ChannelCollection();

            var baseUrl = "https://slack.com/api/channels.list?";
            var tokenParameter = "token=" + token;

            var finalUrl = baseUrl + tokenParameter;

            var ajaxSettings: JQueryAjaxSettings;
            ajaxSettings.type = "GET";
            ajaxSettings.dataType = "json";
            ajaxSettings.url = finalUrl;
            ajaxSettings.success = (data) => {
                // Parse JSON
                console.log(data);
            }

            jQuery.ajax(ajaxSettings);

            return channelCollection;
        }

        static retrieveUsers(token: string): UserCollection {
            var userCollection = new UserCollection();

            var baseUrl = "https://slack.com/api/channels.list?";
            var tokenParameter = "token=" + token;

            var finalUrl = baseUrl + tokenParameter;

            var ajaxSettings: JQueryAjaxSettings;
            ajaxSettings.type = "GET";
            ajaxSettings.dataType = "json";
            ajaxSettings.url = finalUrl;
            ajaxSettings.success = (data) => {
                // Parse JSON
                console.log(data);
            }

            jQuery.ajax(ajaxSettings);

            return userCollection;
        }

    }
}