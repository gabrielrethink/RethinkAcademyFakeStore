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
router.post("/", newProduct);

router.get("/insertAllProducts", starterData);
export default router;
