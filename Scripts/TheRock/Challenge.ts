
/// <reference path="../typings/jquery/jquery.d.ts"/>

module Slackathon {

    export class Challenge {
        public exercice: Exercice;
        public isDone: boolean;
        public user: User;
        public timeoutId: number;

        constructor(exercice: Exercice, user: User, duree: number) {
            this.exercice = exercice;
            this.user = user;
            this.isDone = false;
            this.timeoutId = setInterval(() => {
                TheRock.getInstance().onChallengeTimeout(this);
            }, duree * 60 * 1000);
        }
    }
}