import { google } from 'googleapis';
// console.log(process.env.GOOGLE_PRIVATE_KEY)

const privateKey = process.env.GOOGLE_PRIVATE_KEY

if (!privateKey) {
  throw new Error("GOOGLE_PRIVATE_KEY no está definida")
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: privateKey.replace(/\\n/g, "\n")
  },
  scopes: ["https://www.googleapis.com/auth/drive"]
})

const drive = google.drive({
  version: "v3",
  auth
})

export default drive;

