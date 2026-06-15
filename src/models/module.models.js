class Module {
  constructor(moduleName) {
    this.module = moduleName;
    this.images = [];
  }

  addImage(image) {
    this.images.push(image);
  }

  json() {
    // Ordenar imágenes por el campo "orden" (numérico, ascendente)
    // Las imágenes sin orden se quedan al final, manteniendo su orden de inserción
    const sortedImages = [...this.images].sort((a, b) => {
      if (a.orden !== null && b.orden !== null) return a.orden - b.orden;
      if (a.orden !== null) return -1;
      if (b.orden !== null) return 1;
      return 0;
    });

    return {
      module: this.module,
      images: sortedImages.map(image => image.json())
    }
  } 
}

export default Module;