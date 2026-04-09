# 📚 Documentación Web - Backend API

Backend desarrollado para suministrar imágenes desde Google Drive a una aplicación web de documentación.

La aplicación está dividida en dos secciones principales:

* 🛠️ Manual Técnico
* 👤 Manual de Usuario

Este backend se encarga únicamente de proporcionar imágenes organizadas para ser consumidas por el frontend.

---

# 🚀 Descripción

La API permite obtener diagramas e imágenes almacenadas en Google Drive, organizadas por:

* 📂 Tipo de diagrama
* 🧩 Módulo

El nombre del archivo en Drive se utiliza como título en la respuesta.

---

# 🔗 Endpoints

```
[GET] /api/diagram/:type
[GET] /api/diagram/:type/:module
```

---

## 📌 Parámetros

| Parámetro | Descripción                                            |
| --------- | ------------------------------------------------------ |
| `type`    | Tipo de diagrama (clases, casos-uso, er, navegacion)   |
| `module`  | (Opcional) Filtra por módulo (usuarios, pedidos, etc.) |

---

## 📥 Ejemplos

```
GET /api/diagram/clases
GET /api/diagram/clases/usuarios
GET /api/diagram/er
```

---

# 📦 Respuesta

```json
[
  {
    "id": "1abc123",
    "titulo": "usuarios diagrama clases",
    "url": "https://drive.google.com/uc?id=1abc123",
    "vista": "https://drive.google.com/file/d/1abc123/view"
  }
]
```

---

## 🧾 Campos

| Campo    | Descripción                        |
| -------- | ---------------------------------- |
| `id`     | ID del archivo en Google Drive     |
| `titulo` | Nombre del archivo                 |
| `url`    | URL directa para mostrar la imagen |
| `vista`  | URL de vista en Google Drive       |

---

# 🗂️ Estructura en Google Drive

```
/diagramas
   /clases
   /casos-uso
   /er
   /navegacion
```

---

# 🔐 Configuración

Crear un archivo `.env`:

```
PORT=8000
GOOGLE_CLIENT_EMAIL=tu_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

# ⚙️ Tecnologías

* Node.js
* Express
* Google Drive API

---

# 📌 Notas

* Las imágenes deben tener permisos: "Cualquiera con el enlace"
* El backend no almacena archivos, solo consulta Google Drive
* Los nombres de archivos se usan como títulos

---

# 🧪 Documentación con Swagger (opcional)

Se puede integrar Swagger para documentar y probar la API visualmente.

Instalación:

```
npm install swagger-ui-express swagger-jsdoc
```

Acceso:

```
http://localhost:8000/api-docs
```

---

# 📦 Instalación

```
npm install
```

---

# ▶️ Ejecución

```
npm run dev
```

---

# 🧩 Arquitectura

* Backend: API REST (solo lectura)
* Frontend: consume imágenes
* Almacenamiento: Google Drive

---

# 👨‍💻 Autor

Proyecto desarrollado como solución de documentación web.
