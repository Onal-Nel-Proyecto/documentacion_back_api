class Module {
  constructor(moduleName) {
    this.module = moduleName;
    this.images = [];
  }

  addImage(image) {
    this.images.push(image);
  }

  json() {
    return {
      module: this.module,
      images: this.images.map(image => image.json())
    }
  } 
}

export default Module;