import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const fireBaseJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

// FIREBASE_SERVICE_ACCOUNT_KEY_PATH is stored as an AWS secret. For local development the application falls back to firebaseServiceAccountKey.json

let serviceAccount;

if (fireBaseJson) {
  const parsed = JSON.parse(fireBaseJson);

  serviceAccount = parsed.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

  serviceAccount = JSON.parse(`{${serviceAccount}}`);

  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
} else {
  const filePath = path.join(process.cwd(), "firebaseServiceAccountKey.json");

  if (!fs.existsSync(filePath)) {
    throw new Error(
      "Neither FIREBASE_SERVICE_ACCOUNT_KEY_PATH nor firebaseServiceAccountKey.json exists"
    );
  }

  serviceAccount = JSON.parse(fs.readFileSync(filePath, "utf8"));