var forEach = require("lodash/forEach");
var random = require("lodash/random");
var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";

function Genotipo(tamanoGen) {
  this.genes = [];
  this.fitness = 0;

  for (var i = 0; i < tamanoGen; i++) {
    this.genes[i] = abc[random(abc.length - 1)];
  }

  this.calcFitness = function(objetivo) {
    var puntaje = 0;
    forEach(this.genes, function(gen, i) {
      if (gen === objetivo[i]) {
        puntaje++;
      }
    });
    this.fitness = puntaje / objetivo.length;
  };

  this.cruzar = function(padre) {
    var hijo = new Genotipo(this.genes.length);
    var corte = random(this.genes.length - 1);
    for (var j = 0; j < this.genes.length; j++) {
      if (j > corte) {
        hijo.genes[j] = this.genes[j];
      } else {
        hijo.genes[j] = padre.genes[j];
      }
    }
    return hijo;
  };

  this.mutar = function(rateMutacion) {
    for (var k = 0; k < this.genes.length; k++) {
      if (random(1) < rateMutacion) {
        this.genes[k] = abc[random(abc.length - 1)];
      }
    }
  };
}

module.exports = Genotipo;
