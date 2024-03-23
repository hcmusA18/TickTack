import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  private static instance: AuthMiddleware | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): AuthMiddleware {
    if (AuthMiddleware.instance === null) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    console.log("From authenticate middleware: You are authenticated");
    next();
  };
}

export default AuthMiddleware.getInstance();
