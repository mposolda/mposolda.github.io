class GreatestCommonDivisorFactory extends ExampleFactory {

  createExample() {
    return new GreatestCommonDivisorExample();
  }

  // Compute "level" from the results. This is triggered after computation is fully finished. The default assumes 5 levels
  getLevelFromState(state) {
    var level;
    if (state.errors == 3) {
      level = 1;
    } else {
      level = 3 - state.errors;
    }
    console.log("Computed level " + level);
    return level;
  }

  // Default count of examples for this type
  getDefaultExamplesCount() {
    return 3;
  }

  // Count of levels for examples of this type
  getLevelsCount() {
    return 3;
  }

}

class GreatestCommonDivisorExample extends Example {

  constructor() {
    super();

    var x2 = randomNumber(0, 4);
    var x3 = randomNumber(0, 2);
    var x5 = randomNumber(0, 1);
    var x7 = randomNumber(0, 1);
    var x = Math.pow(2, x2) * Math.pow(3, x3) * Math.pow(5, x5) * Math.pow(7, x7);
    console.log("x: " + x);

    var y2 = randomNumber(0, 4);
    var y3 = randomNumber(0, 2);
    var y5 = randomNumber(0, 1);
    var y7 = randomNumber(0, 1);
    var y = Math.pow(2, y2) * Math.pow(3, y3) * Math.pow(5, y5) * Math.pow(7, y7);
    console.log("y: " + y);

    // 0 - greatest common divisor, 1 - lowest common multiple
    var type = randomNumber(0, 1);
    console.log("type: " + type);
    var z2 = this.#countOfItems(type, x2, y2);
    var z3 = this.#countOfItems(type, x3, y3);
    var z5 = this.#countOfItems(type, x5, y5);
    var z7 = this.#countOfItems(type, x7, y7);
    var z = Math.pow(2, z2) * Math.pow(3, z3) * Math.pow(5, z5) * Math.pow(7, z7);
    console.log("z: " + z);

    this.result = z;
    var asStr1 = type === 0 ? "D(" : "n(";
    this.asStr = asStr1 + x + ", " + y + ") = ";
  }

  #countOfItems(type, x, y) {
    return (type === 0) ? Math.min(x,y) : Math.max(x,y);
  }

}
