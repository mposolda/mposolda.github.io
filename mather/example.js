class ExampleFactory {

  createExample() {
    return null;
  }

  getLevelFromState(state) {
    return 1;
  }
}

class Example {


  // Timestamp (in seconds) when example was started
  startTime = getTimestampInSeconds();

  // Time example took (in seconds). It is set once example is computed
  time;

  // Correct result of this example
  result;

  // Result filled by child. It is set once example is computed
  usedResult;

  // Helper boolean value specifying if computation was successful or not. It is set once example is computed
  goodResult;

  // String representation of this example
  asStr;

  // String representation after the example
  asStrAfter = '';

}