class ExampleRegistry {
  #entries = [];

  register(entry) {
    if (this.#entries.find(e => e.id === entry.id)) {
      throw new Error('Example type already registered: ' + entry.id);
    }
    this.#entries.push(entry);
  }

  getEntries() {
    return this.#entries;
  }

  getFactory(id) {
    var entry = this.#entries.find(e => e.id === id);
    if (!entry) throw new Error('Unknown example type: ' + id);
    return entry.factory();
  }
}

var exampleRegistry = new ExampleRegistry();
