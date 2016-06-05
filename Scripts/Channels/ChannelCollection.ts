
/// <reference path="../typings/jquery/jquery.d.ts"/>

module Slackathon {

    export class ChannelCollection {
        public channels: Array<Channel>;

        getChannelById(id: string): Channel {
            var result: Channel;
            for (var channel of this.channels) {
                if (channel.id === id) {
                    result = channel;
                }
            }
            return result;
        }

        getChannelByName(name: string): Channel {
            var result: Channel;
            for (var user of this.channels) {
                if (user.name === name) {
                    result = user;
                }
            }
            return result;
        }
    }
}