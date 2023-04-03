import { Router } from "express";
import {
  newProduct,
  getAllProducts,
  getAProduct,
  starterData,
} from "../Controllers/Products";

const router: Router = Router();

router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.get("/insertAllProducts", starterData);
router.post("/", newProduct);

export default router;
