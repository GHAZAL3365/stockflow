import { Router } from "express";
import { createProductController, getProductsController } from "../controllers/productController";
import { authenticateToken } from "../middlewares/authMiddleware";
const router = Router();

router.post(
  "/",
  authenticateToken,
  createProductController
);

router.get(
  "/",
  authenticateToken,
  getProductsController
);

export default router;