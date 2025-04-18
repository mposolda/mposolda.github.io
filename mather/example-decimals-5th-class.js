class Decimals5thClassFactory extends ExampleFactory {

  createExample() {
    var operationType = randomNumber(1, 2); // TODO: Change 2nd number to 4 and implement multiply and divide
    switch (operationType) {
      case 1: return new AddDecimals5thClassExample();
      case 2: return new SubtractDecimals5thClassExample();
//      case 3: return new Multiply4thClassExample();
//      case 4: return new Divide4thClassExample();
      default: throw new Error('Strange value of operationType: ' + operationType);
    }
  }

}

class AbstractDecimalsExample extends Example {

  convertUsedResult() {
    this.usedResult = this.usedResult.replaceAll(",", ".");
    return this.usedResult;
  }

  generateDecimalNumber(from, to, maxDecimals) {
    var n = randomNumber(from, to);
    var countDecimalsX = randomNumber(0, maxDecimals);
    var divisor = 10 ** countDecimalsX;
    return n / divisor;
  }

  round(input) {
    var div = 100000;
    return Math.round(input * div) / div;
  }

}

class AddDecimals5thClassExample extends AbstractDecimalsExample {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = this.generateDecimalNumber(2, 9999, 4);
    this.#y = this.generateDecimalNumber(2, 9999, 4);

    this.result = this.round(this.#x + this.#y);
    this.asStr = (this.#x + ' + ' + this.#y + ' = ').replaceAll(".", ",");
  }

}

class SubtractDecimals5thClassExample extends AbstractDecimalsExample {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = this.generateDecimalNumber(2, 9999, 4);
    this.#y = this.generateDecimalNumber(2, 9999, 4);

    if (this.#x < this.#y) {
      var tmp = this.#x;
      this.#x = this.#y;
      this.#y = tmp;
    }

    this.result = this.round(this.#x - this.#y);
    this.asStr = (this.#x + ' - ' + this.#y + ' = ').replaceAll(".", ",");;
  }
}

//class Multiply4thClassExample extends Example {
//
//  #x; // 1st number
//  #y; // 2nd number
//
//  constructor() {
//    super();
//
//    this.#x = randomNumber(2, 999);
//    this.#y = randomNumber(2, 99);
//
//    this.result = this.#x * this.#y;
//    this.asStr = this.#x + ' * ' + this.#y + ' = ';
//  }
//}
//
//class Divide4thClassExample extends Example {
//
//  #x; // 1st number
//  #y; // 2nd number
//
//  constructor() {
//    super();
//
//    this.#x = 123;
//    this.#y = 456;
//    while (this.#x % this.#y != 0) {
//      this.#x = randomNumber(2, 9999);
//      this.#y = randomNumber(2, 9);
//    }
//
//    this.result = this.#x / this.#y;
//    this.asStr = this.#x + ' : ' + this.#y + ' = ';
//  }
//}
