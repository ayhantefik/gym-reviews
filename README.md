# Gym reviews

Automating CI/CD Pipeline for a full-stack gym reviews application Deployment on AWS

## CI/CD Workflow

The deployment pipeline is automated using AWS CodePipeline.

```text
GitHub
   ↓
AWS CodePipeline
   ↓
AWS CodeBuild
   ↓
Amazon ECR
   ↓
Amazon ECS
```

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
ATLAS_URL
```
`ATLAS_URL` Atlas MongoDB connection string

```text
FIREBASE_SERVICE_ACCOUNT
```

`FIREBASE_SERVICE_ACCOUNT` should contain the full contents of:

```text
server/firebaseServiceAccountKey.json
```

---

## AWS Deployment

Steps to follow:

```text
1. Create an Amazon S3 bucket for the React frontend
2. Create two Amazon ECR repositories:
   - gym-reviews-client
   - gym-reviews-server
3. Create an Amazon ECS Cluster
4. Create an ECS Task Definition
5. Create an ECS Service
6. Configure and update the buildspec.yml file
7. Configure and update the Docker files
8. Create an AWS CodeBuild project and connect it to GitHub
9. Create an AWS CodePipeline
```

# Tests

## CodePipeline

<img width="962" height="752" alt="image" src="https://github.com/user-attachments/assets/295a900d-9cc9-4ffe-8eaa-5aebb6d8db19" />

## Unit tests

<img width="700" height="246" alt="image" src="https://github.com/user-attachments/assets/a5e8e7c9-36d7-4dc1-a34c-253c63af675d" />

## Integration tests

<img width="683" height="405" alt="image" src="https://github.com/user-attachments/assets/a22322c1-f464-489e-890c-aad795109cdb" />
