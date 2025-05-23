class ExampleFactory {

  // Creating "example" of this factory
  createExample() {
    throw new Error('Not possible to create example as createExample() is undefined');
  }

  // Compute "level" from the results. This is triggered after computation is fully finished. The default assumes 5 levels
  getLevelFromState(state) {
    var level;
    if (state.errors == 5) {
      level = 1;
    } else {
      level = 5 - state.errors;
    }
    console.log("Computed level " + level);
    return level;
  }

  // Default count of examples for this type
  getDefaultExamplesCount() {
    return 5;
  }

  // Count of levels for examples of this type
  getLevelsCount() {
    return 5;
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

  // Possibly do something with the 'usedResult' to convert it into friendly format, which can be considered as good result. For instance for "Rome numbers" example,
  // adding rome numbers in lowercase like 'mdc' is still considered as a good result (even if it should be strictly 'MDC')
  convertUsedResult() {
    return this.usedResult;
  }

}