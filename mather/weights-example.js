var weights = [
  { type: "mg", toSmallest:  1 },
  { type: "g", toSmallest:   1000 },
  { type: "dag", toSmallest: 10000 },
  { type: "kg", toSmallest:  1000000 },
  { type: "t", toSmallest:   1000000000 }
]


// Example for small multiplication
class WeightsExample extends Example {

  #higherUnits;
  #higherUnitsCount;
  #smallerUnits;
  #smallerUnitsCount;
  #direction;

  constructor() {
    super();

    // Generate g, dag, kg or t
    this.#higherUnits = randomNumber(1, 4);

    this.#higherUnitsCount = randomNumber(1, 9);

    // Generate smaller units. Can be either 1 or 2 degrees below
    this.#smallerUnits = this.#higherUnits === 1 ? 0 : this.#higherUnits - randomNumber(1, 2);

    this.#smallerUnitsCount = weights[this.#higherUnits].toSmallest * this.#higherUnitsCount / weights[this.#smallerUnits].toSmallest;

    // Whether the example is to convert smaller to bigger units OR bigger to smaller units
    this.#direction = randomNumber(0, 1);

    if (this.#direction === 0) {
      this.result = this.#higherUnitsCount;
      this.asStr = this.#smallerUnitsCount + ' ' + weights[this.#smallerUnits].type + ' = ';
      this.asStrAfter = ' ' + weights[this.#higherUnits].type;
    } else {
      this.result = this.#smallerUnitsCount;
      this.asStr = this.#higherUnitsCount + ' ' + weights[this.#higherUnits].type + ' = ';
      this.asStrAfter = ' ' + weights[this.#smallerUnits].type;
    }
  }

}
