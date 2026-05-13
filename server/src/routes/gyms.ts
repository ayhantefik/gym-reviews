import { Router, Request, Response } from "express";
import { verifyToken } from "../middleware/auth";
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

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
        const newGym = new Gym(req.body);
        await newGym.save();
        res.json(newGym);
    } catch (error) {
        console.log(error);
    }
  }
);

export default router;