var GENERATE = -1;
var BORDER_ADD = 200;
var BORDER_SUBTRACT = 200;
var BORDER_MULTIPLY_RESULT = 1000;
var BORDER_MULTIPLY_ACTOR = 50;
var BORDER_DIVIDE = 200;

class Brackets5thClassFactory extends ExampleFactory {

  createExample() {
    while (true) {
      try {
        // Example in the middle
        var operationType1 = randomNumber(1, 4);
        var baseEx = this.#getExample(operationType1, GENERATE);
        console.log("baseEx: " + baseEx.asStr + " = " + baseEx.result);

        // Don't allow two "multiply" or "divide" operations as neighbors
        var opBorder = (operationType1 == 3 || operationType1 == 4) ? 2 : 4;
        var operationType2 = randomNumber(1, opBorder);
        var operationType3 = randomNumber(1, opBorder);
        console.log("operationType2: " + operationType2 + ", operationType3: " + operationType3);

        var ex1 = this.#getExample(operationType2, baseEx.x);
        var ex2 = this.#getExample(operationType3, baseEx.y);
        var finalExample = new BrackCompound5thClassExample(ex1, ex2, baseEx.sign, baseEx.result);
        console.log("finalExample: " + finalExample.asStr);
        return finalExample;
      }  catch (err) {
        console.log("Error: " + err);
      }
    }
  }

  #getExample(operationType, result) {
    switch (operationType) {
      case 1: return new BrackAdd5thClassExample(result);
      case 2: return new BrackSubtract5thClassExample(result);
      case 3: return new BrackMultiply5thClassExample(result);
      case 4: return new BrackDivide5thClassExample(result);
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
    console.log("Brackets: 5thclass - level: " + level);
    return level;
  }

  getDefaultExamplesCount() {
    return 5;
  }
}

class BrackAdd5thClassExample extends Example {

  x; // 1st number
  y; // 2nd number
  sign = '+';

  constructor(givenResult) {
    super();

    if (givenResult != GENERATE && givenResult < 2) {
      throw "Error: add given result was " + givenResult;
    }

    this.result = givenResult == GENERATE ? randomNumber(2, BORDER_ADD) : givenResult;
    this.x = randomNumber(2, this.result);
    this.y = this.result - this.x;

    this.asStr = "(" + this.x + ' + ' + this.y + ")";
  }
}

class BrackSubtract5thClassExample extends Example {

  x; // 1st number
  y; // 2nd number
  sign = '-';

  constructor(givenResult) {
    super();

    this.result = givenResult == GENERATE ? randomNumber(2, BORDER_SUBTRACT) : givenResult;
    this.y = randomNumber(2, BORDER_SUBTRACT);
    this.x = this.result + this.y;

    this.asStr = "(" + this.x + ' - ' + this.y + ")";
  }
}

class BrackMultiply5thClassExample extends Example {

  x; // 1st number
  y; // 2nd number
  sign = '*';

  constructor(givenResult) {
    super();

    this.result = givenResult == GENERATE ? randomNumber(2, BORDER_MULTIPLY_RESULT) : givenResult;

    var counter = 0;
    var finished = false;
    // TODO: Can be done better way (decomposition to primes)
    while ((!finished) && (counter < 100)) {
      counter++;
      this.x = randomNumber(2, BORDER_MULTIPLY_ACTOR);
      if ((this.result % this.x == 0) && (this.result != this.x)) {
        finished = true;
        this.y = this.result / this.x;
      }
    }
    console.log("Counter: " + counter);

    if (!finished) {
      throw "error - multiply counter exceeded. Result: " + this.result;
    }

    this.asStr = this.x + ' * ' + this.y;
  }
}

class BrackDivide5thClassExample extends Example {

  x; // 1st number
  y; // 2nd number
  sign = ':';

  constructor(givenResult) {
    super();

    this.result = givenResult == GENERATE ? randomNumber(2, BORDER_DIVIDE) : givenResult;
    this.y = randomNumber(2, 9);
    this.x = this.result * this.y;

    this.asStr = this.x + ' : ' + this.y;
  }
}


class BrackCompound5thClassExample extends Example {

  constructor(ex1, ex2, sign, givenResult) {
    super();

    this.result = givenResult;
    this.asStr = ex1.asStr + " " + sign + " " + ex2.asStr + " = ";
  }
}
