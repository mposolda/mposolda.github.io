var weights = [
  { type: "mg", toSmallest:  1 },
  { type: "g", toSmallest:   1000 },
  { type: "dag", toSmallest: 10000 },
  { type: "kg", toSmallest:  1000000 },
  { type: "t", toSmallest:   1000000000 }
];

var lengths = [
  { type: "mm", toSmallest:  1 },
  { type: "cm", toSmallest:  10 },
  { type: "dm", toSmallest:  100 },
  { type: "m", toSmallest:   1000 },
  { type: "km", toSmallest:  1000000 }
];

var volumes = [
  { type: "ml", toSmallest: 1 },
  { type: "dl", toSmallest: 100 },
  { type: "l", toSmallest:  1000 },
  { type: "hl", toSmallest: 100000 }
];

class UnitsExampleFactory extends ExampleFactory {

  createExample() {
    var unitsType = randomNumber(1, 3);
    switch (unitsType) {
      case 1: return new UnitsExample(weights);
      case 2: return new UnitsExample(lengths);
      case 3: return new UnitsExample(volumes);
      default: throw new Error('Strange value of unitsType: ' + operationType);
    }
    return new WeightsExample();
  }

  getLevelFromState(state) {
    var level;
    if (state.errors >= state.ok) {
      level = 1;
    } else if (state.errors * 3 >= state.ok) {
      level = 2;
//    } else if (state.errors > 1) {
//      level = 3;
    } else if (state.errors == 1) {
//      level = 4;
      level = 5;
//    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 32)) {
//      level = 5;
//    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 20)) {
//      level = 6;
//    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 10)) {
//      level = 7;
    } else {
      level = 8;
    }
    console.log("Units: Computed level " + level);
    return level;
  }

  getDefaultExamplesCount() {
    return 5;
  }
}

// Example for conversion of weights, lengths or volumes from various units to different units
class UnitsExample extends Example {

  #higherUnits;
  #higherUnitsCount;
  #smallerUnits;
  #smallerUnitsCount;
  #direction;

  constructor(units) {
    super();

    // Generate g, dag, kg or t
    this.#higherUnits = randomNumber(1, 4);

    this.#higherUnitsCount = randomNumber(1, 9);

    // Higher units can be either something like "8" or "80"
    if (randomNumber(0, 1) === 1) {
      this.#higherUnitsCount = this.#higherUnitsCount * 10;
    }

    // Generate smaller units. Can be either 1 or 2 degrees below
    this.#smallerUnits = this.#higherUnits === 1 ? 0 : this.#higherUnits - randomNumber(1, 2);

    this.#smallerUnitsCount = units[this.#higherUnits].toSmallest * this.#higherUnitsCount / units[this.#smallerUnits].toSmallest;

    // Whether the example is to convert smaller to bigger units OR bigger to smaller units
    this.#direction = randomNumber(0, 1);

    if (this.#direction === 0) {
      this.result = this.#higherUnitsCount;
      this.asStr = this.#smallerUnitsCount + ' ' + units[this.#smallerUnits].type + ' = ';
      this.asStrAfter = ' ' + units[this.#higherUnits].type;
    } else {
      this.result = this.#smallerUnitsCount;
      this.asStr = this.#higherUnitsCount + ' ' + units[this.#higherUnits].type + ' = ';
      this.asStrAfter = ' ' + units[this.#smallerUnits].type;
    }
  }

}
