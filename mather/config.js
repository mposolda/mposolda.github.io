class Config {
  #examplesCount = 2;

  getExamplesCount() {
    return this.#examplesCount;
  }
}

class ConfigProvider {

  confirmConfig() {
    console.log("Configuration confirmed");
    mather.startMe();
  }

}

var config = new Config();
var configProvider = new ConfigProvider();
