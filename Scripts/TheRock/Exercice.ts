
/// <reference path="../typings/jquery/jquery.d.ts"/>

module Slackathon {

    export class Exercice {
        public id: string;
        public name: string;
        public minRep: number;
        public maxRep: number;
        public unit: string;
        public repetition: number;

        constructor() {
            this.repetition = Math.floor(Math.random() * this.maxRep) + this.minRep;
        }

        toString(): string {
            return "Do " + this.repetition + " " + this.unit + " of " + this.name + " :)";
        }
    }
}