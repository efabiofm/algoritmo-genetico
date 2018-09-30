var forEach = require("lodash/forEach");
var maxBy = require("lodash/maxBy");
var random = require("lodash/random");
var Genotipo = require("./genotipo.js");

function Poblacion(objetivo, rateMutacion, poblacionMax) {
  var poblacion = [];
  var matingPool = [];

  // primera generación de individuos
  for(var i = 0; i < poblacionMax; i++) {
    poblacion[i] = new Genotipo(objetivo.length); // array de caracteres aleatorios
  }

  // calcula el fitness de todos los individuos
  this.calcFitness = function() {
    forEach(poblacion, (gen) => {
      gen.calcFitness(objetivo);
    });
  };

  /*
   * cada individuo se mete a la piscina según su fitness * 100
   * ej. si tiene un fitness de 0.06, se mete 6 veces
   * así es más probable escoger los de fitness más alto al aparearlos
   */
  this.generarMatingPool = function() {
    matingPool = [];
    forEach(poblacion, (gen) => {
      const cantVecesEnPool = Math.floor(gen.fitness * 100);
      for (var j = 0; j < cantVecesEnPool; j++) {
        matingPool.push(gen);
      }
    });
  };

  this.crearNuevaGeneracion = function() {
    forEach(poblacion, (gen, i) => {
      var padre1 = matingPool[random(matingPool.length - 1)];
      var padre2 = matingPool[random(matingPool.length - 1)];
      var hijo = padre1.cruzar(padre2);
      hijo.mutar(rateMutacion);
      poblacion[i] = hijo;
    });
  };

  this.obtenerMejor = function() {
    return maxBy(poblacion, "fitness");
  };
}

module.exports = Poblacion;
