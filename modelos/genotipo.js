var forEach = require("lodash/forEach");
var random = require("lodash/random");
var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";

function Genotipo(tamanoGen) {
  this.genes = [];
  this.fitness = 0;

  for (var i = 0; i < tamanoGen; i++) {
    this.genes[i] = abc[random(abc.length - 1)];
  }

  /*
   * se comparan las letras del gen con el resultado
   * si coinciden en la misma posición, se le suma un punto de fitness
   */
  this.calcFitness = function(objetivo) {
    var puntaje = 0;
    forEach(this.genes, function(gen, i) {
      if (gen === objetivo[i]) {
        puntaje++;
      }
    });
    this.fitness = puntaje / objetivo.length;
  };

  /*
   * el hijo se crea a partir de una mitad de genes de este genotipo y la otra mitad de otro
   * la mitad se obtiene cortando en un punto aleatorio
   */
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

  /*
   * si la probabilidad de mutación es mayor a un número aleatorio 0..1
   * entonces se cambia algún gen por una letra aleatoria
   */
  this.mutar = function(rateMutacion) {
    for (var k = 0; k < this.genes.length; k++) {
      if (Math.random() < rateMutacion) {
        this.genes[k] = abc[random(abc.length - 1)];
      }
    }
  };
}

module.exports = Genotipo;
