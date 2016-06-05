exports.Exercice = {
   generateExercice : function(minRep, maxRep, name, unit){
       var repetition = Math.floor(Math.random() * maxRep) + minRep;
       return "Do " + repetition + " " + unit + " of " + name + " :)";
   }
}
