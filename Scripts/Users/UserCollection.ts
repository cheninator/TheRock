
/// <reference path="../typings/jquery/jquery.d.ts"/>

module Slackathon {

    export class UserCollection {
        public users: Array<User>;
        
        getUserById(id: string): User {
            var result: User;
            for (var user of this.users) {
                if (user.id === id) {
                    result = user;
                }
            }
            return result;
        }

        getUserByName(name: string): User {
            var result: User;
            for (var user of this.users) {
                if (user.name === name) {
                    result = user;
                }
            }
            return result;
        }
    }
}