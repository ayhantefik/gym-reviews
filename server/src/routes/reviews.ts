import { Router, Request, Response } from "express";
import { verifyToken } from "../middleware/auth";
import { Review } from "../models/review";

const router = Router();

router.get(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.json(newReview);
    } catch (error) {
        console.log(error);
    }
  }
);

export default router;