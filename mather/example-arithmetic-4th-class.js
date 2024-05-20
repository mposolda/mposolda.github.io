class Arithmetic4thClassFactory extends ExampleFactory {

  createExample() {
    var operationType = randomNumber(1, 4);
    
  }

  getLevelFromState(state) {
    var level;
    if (state.errors >= state.ok) {
      level = 1;
    } else if (state.errors * 3 >= state.ok) {
      level = 2;
    } else if (state.errors == 1) {
      level = 5;
    } else {
      level = 8;
    }
    console.log("Arithmetic4thClass: Computed level " + level);
    return level;
  }

  getDefaultExamplesCount() {
    return 5;
  }
}

// Example for conversion of weights from various units to different units
//class WeightsExample extends Example {
//
//  #higherUnits;
//  #higherUnitsCount;
//  #smallerUnits;
//  #smallerUnitsCount;
//  #direction;
//
//  constructor() {
//    super();
//
//    // Generate g, dag, kg or t
//    this.#higherUnits = randomNumber(1, 4);
//
//    this.#higherUnitsCount = randomNumber(1, 9);
//
//    // Higher units can be either something like "8" or "80"
//    if (randomNumber(0, 1) === 1) {
//      this.#higherUnitsCount = this.#higherUnitsCount * 10;
//    }
//
//    // Generate smaller units. Can be either 1 or 2 degrees below
//    this.#smallerUnits = this.#higherUnits === 1 ? 0 : this.#higherUnits - randomNumber(1, 2);
//
//    this.#smallerUnitsCount = weights[this.#higherUnits].toSmallest * this.#higherUnitsCount / weights[this.#smallerUnits].toSmallest;
//
//    // Whether the example is to convert smaller to bigger units OR bigger to smaller units
//    this.#direction = randomNumber(0, 1);
//
//    if (this.#direction === 0) {
//      this.result = this.#higherUnitsCount;
//      this.asStr = this.#smallerUnitsCount + ' ' + weights[this.#smallerUnits].type + ' = ';
//      this.asStrAfter = ' ' + weights[this.#higherUnits].type;
//    } else {
//      this.result = this.#smallerUnitsCount;
//      this.asStr = this.#higherUnitsCount + ' ' + weights[this.#higherUnits].type + ' = ';
//      this.asStrAfter = ' ' + weights[this.#smallerUnits].type;
//    }
//  }
//
//}
