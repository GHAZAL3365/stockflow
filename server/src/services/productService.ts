import Product, { IProduct } from "../models/Product";

interface CreateProductData {
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  status?: "active" | "inactive";
  description?: string;
  createdBy: string;
}

export const createProduct = async (
  data: CreateProductData
): Promise<IProduct> => {
  const product = await Product.create({
    ...data,
    createdBy: data.createdBy,
  });

  return product;
};


export const getProducts = async (): Promise<IProduct[]> => {
  const products = await Product.find()
    .sort({ createdAt: -1 });

  return products;
};