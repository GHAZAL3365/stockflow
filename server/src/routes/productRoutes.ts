import { Router } from "express";
import { createProductController, getProductsController, getProductByIdController, updateProductController, deleteProductController } from "../controllers/productController";
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

router.get(
  "/:id",
  authenticateToken,
  getProductByIdController
);
router.put(
  "/:id",
  authenticateToken,
  updateProductController
);
router.delete(
  "/:id",
  authenticateToken,
  deleteProductController
);



export default router;