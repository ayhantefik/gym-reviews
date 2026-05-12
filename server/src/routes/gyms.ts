import { Router, Request, Response, NextFunction } from "express";
import { Gym } from "../models/gym";
const router = Router();

router.get(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const gyms = await Gym.find();
      res.json(gyms);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const gym = await Gym.findById(id);
        res.json(gym);
    } catch (error) {
        console.log(error);
    }
  }
);

export default router;