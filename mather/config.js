class Config {
  #examplesCount = 2;
  #exampleType;

  getExamplesCount() {
    return this.#examplesCount;
  }

  setExamplesCount(examplesCount) {
    this.#examplesCount = examplesCount;
  }

  getExampleType() {
    return this.#exampleType;
  }

  setExampleType(exampleType) {
    this.#exampleType = exampleType;
  }

  toString() {
    return "examplesCount=" + this.#examplesCount + ", exampleType=" + this.#exampleType;
  }
}

class ConfigProvider {

  confirmConfig() {
    var exampleType = this.#getSelectedExampleType();

    config.setExampleType(exampleType);

    console.log("Configuration confirmed: " + config.toString());
    mather.startMe();
  }

  #getSelectedExampleType() {
    var inputs = document.getElementsByName('examplesType')
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        var selected = inputs[i];
        return selected.id;
      }
    }
  }

}

var config = new Config();
var configProvider = new ConfigProvider();