import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const fireBaseJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

// FIREBASE_SERVICE_ACCOUNT_KEY_PATH is stored as an AWS secret. For local development the application falls back to firebaseServiceAccountKey.json

let serviceAccount: any;

if (fireBaseJson) {
  try {
    let parsed: any = JSON.parse(fireBaseJson);

    // Hantera om AWS returnerar en serialiserad JSON-sträng
    while (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }

    serviceAccount = parsed;

    if (!serviceAccount.private_key) {
      throw new Error(
        `Firebase service account saknar private_key. Keys: ${Object.keys(
          serviceAccount
        ).join(", ")}`
      );
    }

    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      "\n"
    );
  } catch (error) {
    console.error("Failed to parse Firebase service account:", error);
    throw error;
  }
} else {
  const filePath = path.join(
    process.cwd(),
    "firebaseServiceAccountKey.json"
  );

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