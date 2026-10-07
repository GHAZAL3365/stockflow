import express from "express";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "StockFlow API is running",
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
});

export default app;