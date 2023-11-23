import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
const secretKey = "soSecret";

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload;
    }
  }
}

async function superAdminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken!.split("Bearer ")[1];
    const tokenPayload = (await jwt.verify(token, secretKey)) as jwt.JwtPayload;
    req.user = tokenPayload;
    if (tokenPayload.role === "super_admin") {
      next();
    } else {
      res.status(403).json({
        message: "Please login as an Super Admin",
      });
    }
  } catch (err: any) {
    res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
}

async function authentification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken!.split("Bearer ")[1];
    const tokenPayload = (await jwt.verify(token, secretKey)) as jwt.JwtPayload;
    console.log(tokenPayload.role);
    req.user = tokenPayload;
    next();
  } catch (err: any) {
    res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
}

async function adminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken!.split("Bearer ")[1];
    const tokenPayload = (await jwt.verify(token, secretKey)) as jwt.JwtPayload;
    console.log(tokenPayload.role);
    req.user = tokenPayload;
    const adminRole = ["admin", "super_admin"];
    if (adminRole.includes(tokenPayload.role)) {
      next();
    } else {
      res.status(403).json({
        message: "Please login as an admin",
      });
    }
  } catch (err: any) {
    res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
}

module.exports = { superAdminAuth, authentification, adminAuth };
