import admin from "firebase-admin";
import { readFile } from "fs/promises";

const buffer = await readFile(
    new URL("../../firebaseServiceAccountKey.json", import.meta.url)
);


const serviceAccount = JSON.parse(buffer.toString());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;