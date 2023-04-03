import { Router } from "express";
import productsRoutes from "./products";

const router: Router = Router();

router.use("/products", productsRoutes);

export { router };
