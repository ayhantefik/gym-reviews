import admin from "../firebase/firebaseAdmin";
import { DecodedIdToken } from "firebase-admin/auth";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: DecodedIdToken;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split("Bearer ")[1];

        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken;

        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};