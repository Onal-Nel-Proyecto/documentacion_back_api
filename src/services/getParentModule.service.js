import drive from "../config.js";
// Función para obtener el módulo padre por su nombre
const getParentModule = async (nameFolder) => {
  const data = await drive.files.list({
    pageSize: 10,
    fields: "files(id, name, mimeType)"
  })
  let filter = await data.data.files.filter(event =>
    event.mimeType == "application/vnd.google-apps.folder"
    && event.name == nameFolder
  )
  return filter;
}

export { getParentModule }