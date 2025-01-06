class SmallMultiplicationExampleFactory extends ExampleFactory {

  createExample() {
    return new SmallMultiplicationExample();
  }

  getLevelFromState(state) {
    var level;
    if (state.errors >= state.ok) {
      level = 1;
    } else if (state.errors * 3 >= state.ok) {
      level = 2;
    } else if (state.errors > 1) {
      level = 3;
    } else if (state.errors == 1) {
      level = 4;
    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 16)) {
      level = 5;
    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 10)) {
      level = 6;
    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 5)) {
      level = 7;
    } else {
      level = 8;
    }
    console.log("SmallMultiplication: Computed level " + level);
    return level;
  }

  getDefaultExamplesCount() {
    return 10;
  }

  getLevelsCount() {
    return 8;
  }
}


// Example for small multiplication
class SmallMultiplicationExample extends Example {

  #x; // 1st number
  #y; // 2nd number

  // 0 is multiply, 1 is divide
  #sign;

  constructor() {
    super();

    this.#x = randomNumber(2, 10);
    this.#y = randomNumber(2, 10);

    // 0 is multiply, 1 is divide
    this.#sign = randomNumber(0, 1);

    this.result = this.#x * this.#y;

    // This means example for dividing
    if (this.#sign === 1) {
      var tmp = this.#x;
      this.#x = this.result;
      this.result = tmp;
      this.asStr = this.#x + ' : ' + this.#y + ' = ';
    } else {
      this.asStr = this.#x + ' * ' + this.#y + ' = ';
    }

  }

}
