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

export const getProductById = async (
  id: string
): Promise<IProduct | null> => {
  const product = await Product.findById(id);

  return product;
};

export const updateProduct = async (
  id: string,
  data: Partial<{
    name: string;
    sku: string;
    category: string;
    price: number;
    quantity: number;
    status: "active" | "inactive";
    description: string;
  }>
): Promise<IProduct | null> => {
  const product = await Product.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return product;
};


export const deleteProduct = async (
  id: string
): Promise<IProduct | null> => {
  const product = await Product.findByIdAndDelete(id);

  return product;
};