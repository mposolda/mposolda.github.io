class SmallMultiplicationExampleFactory {

  createExample() {
    return new SmallMultiplicationExample();
  }

  getLevelFromState(state) {
    // TODO
    return 1;
  }

  getDefaultExamplesCount() {
    return 10;
  }
}


// Example for small multiplication
class SmallMultiplicationExample extends Example {

  #x; // 1st number
  #y; // 2nd number

  // 0 is multiply, 1 is divide
  #sign;

  result;

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
