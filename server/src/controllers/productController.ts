import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../services/productService";

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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const category =
      typeof req.query.category === "string"
        ? req.query.category
        : undefined;

    const status =
      typeof req.query.status === "string"
        ? req.query.status
        : undefined;

    const sort =
      typeof req.query.sort === "string"
        ? req.query.sort
        : "createdAt";

    const order =
      req.query.order === "asc"
        ? "asc"
        : "desc";

    const result = await getProducts(
      page,
      limit,
      search,
      category,
      status,
      sort,
      order
    );

    res.status(200).json({
      success: true,
      data: result.products,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getProductByIdController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await getProductById(id as string);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};
export const updateProductController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await updateProduct(id as string, req.body);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};
export const deleteProductController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (typeof id !== "string") {

    }

    const product = await deleteProduct(id as string);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};