import admin from "firebase-admin";
import fs from "fs";
import path from "path";

let serviceAccount;

const fireBaseJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

// FIREBASE_SERVICE_ACCOUNT_KEY_PATH is stored as an AWS secret. For local development the application falls back to firebaseServiceAccountKey.json

if (fireBaseJson) {
  serviceAccount = JSON.parse(fireBaseJson);
} else {
  const filePath = path.join(process.cwd(), "firebaseServiceAccountKey.json");

  if (!fs.existsSync(filePath)) {
    throw new Error(
      "Neither FIREBASE_SERVICE_ACCOUNT_KEY_PATH nor firebaseServiceAccountKey.json exists"
    );
  }

  serviceAccount = JSON.parse(fs.readFileSync(filePath, "utf8"));
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;