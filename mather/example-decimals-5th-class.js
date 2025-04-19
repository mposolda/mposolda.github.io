class Decimals5thClassFactory extends ExampleFactory {

  createExample() {
//    return new Decimal5thClassMultipleDivideTensExample();
    var operationType = randomNumber(1, 5);
    switch (operationType) {
      case 1: return new AddDecimals5thClassExample();
      case 2: return new SubtractDecimals5thClassExample();
      case 3: return new MultiplyDecimal5thClassExample();
      case 4: return new DivideDecimal5thClassExample();
      case 5: return new Decimal5thClassMultipleDivideTensExample();
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

class MultiplyDecimal5thClassExample extends AbstractDecimalsExample {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = this.generateDecimalNumber(2, 999, 4);
    this.#y = randomNumber(2, 99);

    this.result = this.round(this.#x * this.#y);
    this.asStr = (this.#x + ' * ' + this.#y + ' = ').replaceAll(".", ",");
  }
}

class DivideDecimal5thClassExample extends AbstractDecimalsExample {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = this.generateDecimalNumber(2, 999, 2);
    this.#y = randomNumber(2, 9);

    this.result = this.round(this.#x / this.#y);
    this.asStr = (this.#x + ' : ' + this.#y + ' = ').replaceAll(".", ",");
  }

  convertUsedResult() {
    this.usedResult = this.usedResult.replaceAll(",", ".");
    this.usedResult = Number(this.usedResult);
    this.usedResult = this.round(this.usedResult);
    return this.usedResult;
  }

}

class Decimal5thClassMultipleDivideTensExample extends AbstractDecimalsExample {

  #x; // 1st number
  #y; // 2nd number

  constructor() {
    super();

    this.#x = this.generateDecimalNumber(2, 999, 2);
    this.#y = 10 ** randomNumber(1, 3);

    var operationType = randomNumber(1, 2);
    if (operationType == 1) {
      this.result = this.round(this.#x * this.#y);
      this.asStr = (this.#x + ' * ' + this.#y + ' = ').replaceAll(".", ",");
    } else {
      this.result = this.round(this.#x / this.#y);
      this.asStr = (this.#x + ' : ' + this.#y + ' = ').replaceAll(".", ",");
    }
  }
}
