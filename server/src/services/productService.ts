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


export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  category?: string,
  status?: string,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc"
) => {
  const filter: Record<string, any> = {};

  // Search by product name or SKU
  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        sku: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Filter by status
  if (status) {
    filter.status = status;
  }

  // Calculate how many records to skip
  const skip = (page - 1) * limit;

  // Convert order into MongoDB sort value
  const sortOrder = order === "asc" ? 1 : -1;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit),

    Product.countDocuments(filter),
  ]);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
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