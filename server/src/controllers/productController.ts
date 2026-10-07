import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { createProduct, getProducts } from "../services/productService";

export const createProductController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      sku,
      category,
      price,
      quantity,
      status,
      description,
    } = req.body;

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

      return;
    }

    const product = await createProduct({
      name,
      sku,
      category,
      price,
      quantity,
      status,
      description,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

export const getProductsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const products = await getProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};