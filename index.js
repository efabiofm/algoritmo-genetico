var Poblacion = require("./modelos/poblacion.js");

var objetivo = "Fabio";
var rateMutacion = 0.01;
var poblacionMax = 1000;

var poblacion = new Poblacion(objetivo, rateMutacion, poblacionMax);
poblacion.calcFitness();

function correr() {
  poblacion.generarMatingPool();
  poblacion.crearNuevaGeneracion();
  poblacion.calcFitness();
  var mejor = poblacion.obtenerMejor();
  console.log(mejor.genes.join(""));
  if (mejor.fitness !== 1) {
    return correr();
  }
  return true;
}

correr();
