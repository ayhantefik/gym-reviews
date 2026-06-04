import admin from "firebase-admin";

const fireBaseJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!fireBaseJson) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing");
}

console.log(fireBaseJson);
console.log("HERE....................");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;

// import admin from "firebase-admin";
// import dotenv from "dotenv";
// import fs from "fs";


// dotenv.config();

// const serviceAccount = JSON.parse(
//   fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH!, "utf8")
// );

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// export default admin;