var Poblacion = require("./modelos/poblacion.js");

var objetivo = "Esta es la clave del administrador";
var rateMutacion = 0.01;
var poblacionMax = 1000;

var poblacion = new Poblacion(objetivo, rateMutacion, poblacionMax);

// 1. calcular el fitness de la primera generación
poblacion.calcFitness();

function correr() {
  // 2. meter los individuos en el mating pool tantas veces como sea el fitness de cada uno
  poblacion.generarMatingPool();
  // 3. cruzar todos los individuos dentro del pool para tener una nueva población con sus hijos
  poblacion.crearNuevaGeneracion();
  // 4. calcular el fitness de los nuevos individuos, tendrán mejor fitness
  poblacion.calcFitness();
  var mejor = poblacion.obtenerMejor();
  console.log(mejor.genes.join(""));
  // si el fitness es 1, significa que el gen es igual al objetivo y se detiene la evolución
  if (mejor.fitness !== 1) {
    // si no, vuelve a repetirse todo el proceso hasta llegar al objetivo
    return correr();
  }
  return true;
}

correr();
