import { Request, Response } from "express";
import RecsysService from "../services/recsys.service";

class RecSysController {
  private static instance: RecSysController | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): RecSysController {
    if (RecSysController.instance === null) {
      RecSysController.instance = new RecSysController();
    }
    return RecSysController.instance;
  }

  getRecommendation = async (req: Request, res: Response) => {
    try {
      const recommendation =
        await RecsysService.getInstance().getRecommendation(req.params.userId);
      res.status(200).json({ recommendation });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting recommendation: ${_error.message}`,
      });
    }
  };
}

export default RecSysController;
