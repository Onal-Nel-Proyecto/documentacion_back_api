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
    // Módulo "Principal" siempre primero en la respuesta
    const sorted = [...this.content].sort((a, b) => {
      if (a.module.toUpperCase() === 'PRINCIPAL') return -1;
      if (b.module.toUpperCase() === 'PRINCIPAL') return 1;
      return 0;
    });

    return {
      id: this.id,
      type: this.type,
      content: sorted.map(module => module.json())
    }
  }
}

export default Folder;