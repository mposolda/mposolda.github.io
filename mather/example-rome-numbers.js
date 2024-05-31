class RomeNumbersClassFactory extends ExampleFactory {

  createExample() {
    return new RomeNumbersExample();
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
    console.log("RomeNumbersClass: Computed level " + level);
    return level;
  }

  getDefaultExamplesCount() {
    return 5;
  }
}

class RomeNumbersExample extends Example {

  constructor() {
    super();

    var x1 = randomNumber(0, 1);
    var x2 = randomNumber(0, 9);
    var x3 = randomNumber(0, 9);
    var x4 = randomNumber(0, 9);
    var x = x1 * 1000 + x2 * 100 + x3 * 10 + x4;

    var str = x1 === 0 ? "" : "M";
    str = str + this.#romeForNumber(x2, "C", "D", "M");
    str = str + this.#romeForNumber(x3, "X", "L", "C");
    str = str + this.#romeForNumber(x4, "I", "V", "X");

    // 0 is romeToNumber, 1 is numberToRome
    var sign = randomNumber(0, 1);
    if (sign === 1) {
      this.result = x;
      this.asStr = str + ' = ';
    } else {
      this.result = str;
      this.asStr = x + ' = ';
    }

  }

  #romeForNumber(num, char1, char2, char3) {
    switch (num) {
      case 0: return "";
      case 1: return char1;
      case 2: return char1 + char1;
      case 3: return char1 + char1 + char1;
      case 4: return char1 + char2;
      case 5: return char2;
      case 6: return char2 + char1;
      case 7: return char2 + char1 + char1;
      case 8: return char2 + char1 + char1 + char1;
      case 9: return char1 + char3;
      default: throw new Error('Invalid num: ' + num);
    }
  }

  convertUsedResult() {
    this.usedResult = this.usedResult.toUpperCase();
    return this.usedResult;
  }

}
