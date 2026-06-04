# Gym reviews

A full-stack booking application.

## Folder Structure

- **`client/`**: The frontend portion of the application, built with React (Vite).
- **`server/`**: The backend API, built with Node.js and Express.

## Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd gym-reviews
```

### 2. Install Dependencies
You need to install dependencies for both the frontend and backend separately:

**Frontend (Client)**
```bash
cd client
npm install
```

**Backend (Server)**
```bash
cd ../server
npm install
```

# GitHub Secrets

Go to:

```text
Settings → Secrets and variables → Actions
```

Add these repository secrets:

## Backend

```text
FIREBASE_SERVICE_ACCOUNT
```

`FIREBASE_SERVICE_ACCOUNT` should contain the full contents of:

```text
server/firebaseServiceAccountKey.json
```

---

## Frontend

Get these values from Firebase Console → Project Settings:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_API_URL
```

# Tests

## Unit tests

<img width="700" height="246" alt="image" src="https://github.com/user-attachments/assets/a5e8e7c9-36d7-4dc1-a34c-253c63af675d" />

## Integration tests

<img width="683" height="405" alt="image" src="https://github.com/user-attachments/assets/a22322c1-f464-489e-890c-aad795109cdb" />