class DriveFile {
  constructor(id, name, description, parents) {
    this.id = id;

    const safeName = name || "";

    const parts = safeName.split("-");
    const modulo = parts[0] || "";
    const rawName = parts[1] || "";

    const cleanName = rawName.includes(".")
      ? rawName.split(".")[0]
      : rawName;

    this.name = cleanName;
    this.modulo = modulo;

    this.url = "https://drive.google.com/uc?export=view&id=" + id;
    this.description = description;
    this.parents = parents;
  }

  json() {
    return {
      id: this.id,
      title: this.name,
      url: this.url,
      modulo: this.modulo,
      description: this.description,
      carpeta: this.parents
    }
  }
}

export default DriveFile;