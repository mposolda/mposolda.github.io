class Config {
  #examplesCount = 2;
  #exampleType;
  #exampleFactory;
  #pictureType;

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

  getExampleFactory() {
    return this.#exampleFactory;
  }

  setExampleFactory(exampleFactory) {
    this.#exampleFactory = exampleFactory;
  }

  getPictureType() {
    return this.#pictureType;
  }

  setPictureType(pictureType) {
    this.#pictureType = pictureType;
  }

  toString() {
    return "examplesCount=" + this.#examplesCount + ", exampleType=" + this.#exampleType + ", pictureType=" + this.#pictureType;
  }
}

class ConfigProvider {

  confirmConfig() {
    var exampleType = this.#getSelectedExampleType();
    var pictureType = this.#getSelectedPictureType();

    config.setExampleType(exampleType);
    config.setPictureType(pictureType);
    var exampleFactory = this.#getExampleFactory(exampleType);
    config.setExampleFactory(exampleFactory);
    config.setExamplesCount(exampleFactory.getDefaultExamplesCount());

    console.log("Configuration confirmed: " + config.toString());
    mather.startMe();
  }

  #getExampleFactory(exampleType) {
    switch (exampleType) {
      case 'smallMultiplication': return new SmallMultiplicationExampleFactory();
      case 'weights': return new UnitsExampleFactory();
      case 'arithmetic4thClass': return new Arithmetic4thClassFactory();
      case 'romeNumbers': return new RomeNumbersClassFactory();
      case 'brackets5thClass': return new Brackets5thClassFactory();
      case 'decimals5thClass': return new Decimals5thClassFactory();
      default: throw new Error('Unknown example type: ' + exampleType);
    }
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

  #getSelectedPictureType() {
    var inputs = document.getElementsByName('picturesType')
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
