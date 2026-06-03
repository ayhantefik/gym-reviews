import admin from "firebase-admin";
// import { readFile } from "fs/promises";

// const buffer = await readFile(
//     new URL("../../firebaseServiceAccountKey.json", import.meta.url)
// );

const FIREBASE_ACCOUNT_KEY = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

if (!FIREBASE_ACCOUNT_KEY) {
    throw new Error("CONNECTION_STRING is missing");
}

const serviceAccount = require(FIREBASE_ACCOUNT_KEY);

admin.credential.cert(serviceAccount)

// const serviceAccount = JSON.parse(buffer.toString());

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

export default admin;