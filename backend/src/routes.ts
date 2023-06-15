import Express, { Request, Response } from "express";
const router = Express.Router();
import authController from "./controllers/auth-controller";

router.post("/api/register", authController.registerUser);
router.post("/api/login", authController.loginUser);
export default router;
