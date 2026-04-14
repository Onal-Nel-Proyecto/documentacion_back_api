class Folder {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.content = [];
  }

  addModule(module) { 
    this.content.push(module);
  }

  json() {
    return {
      id: this.id,
      type: this.type,
      content: this.content.map(module => module.json())
    }
  }
}

export default Folder;