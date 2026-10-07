import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { authenticateToken,  AuthRequest } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get(
  "/me",
  authenticateToken,
  (req: AuthRequest, res) => {
    res.status(200).json({
      success: true,
      message: "Authenticated user",
      user: req.user,
    });
  }
);

export default router;