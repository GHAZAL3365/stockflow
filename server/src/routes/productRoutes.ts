import { Router } from "express";
import { createProductController, getProductsController, getProductByIdController, updateProductController, deleteProductController } from "../controllers/productController";
import { authenticateToken } from "../middlewares/authMiddleware";
import {authorizeRoles} from "../middlewares/roleMiddleware";
const router = Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin", "manager"),
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
  authorizeRoles("admin", "manager"),
  updateProductController
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),

  deleteProductController
);



export default router;