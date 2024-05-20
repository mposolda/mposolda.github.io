class Arithmetic4thClassFactory extends ExampleFactory {

  createExample() {
    var operationType = randomNumber(1, 4);
    switch (operationType) {
      case 1: return new Add4thClassExample();
      case 2: return new Subtract4thClassExample();
      case 3: return new Multiply4thClassExample();
      case 4: return new Divide4thClassExample();
      default: throw new Error('Strange value of operationType: ' + operationType);
    }
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

class Add4thClassExample extends Example {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = randomNumber(2, 9999);
    this.#y = randomNumber(2, 9999);

    this.result = this.#x + this.#y;
    this.asStr = this.#x + ' + ' + this.#y + ' = ';
  }
}

class Subtract4thClassExample extends Example {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = randomNumber(2, 15000);
    this.#y = randomNumber(2, this.#x);

    this.result = this.#x - this.#y;
    this.asStr = this.#x + ' - ' + this.#y + ' = ';
  }
}

class Multiply4thClassExample extends Example {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = randomNumber(2, 999);
    this.#y = randomNumber(2, 99);

    this.result = this.#x * this.#y;
    this.asStr = this.#x + ' * ' + this.#y + ' = ';
  }
}

class Divide4thClassExample extends Example {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = 123;
    this.#y = 456;
    while (this.#x % this.#y != 0) {
      this.#x = randomNumber(2, 9999);
      this.#y = randomNumber(2, 9);
    }

    this.result = this.#x / this.#y;
    this.asStr = this.#x + ' : ' + this.#y + ' = ';
  }
}
