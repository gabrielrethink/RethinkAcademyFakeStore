import { NextFunction, Request, Response } from "express";
import {
  insertStarterData,
  selectAllProducts,
  selectAProduct,
  insertProduct,
} from "../Service/Products";
import { Product } from "../types";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await selectAllProducts();
    res.status(200).json(allProducts);
  } catch (error: unknown | Error) {
    next(error);
  }
};

const newProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, price, description, category } = req.body;
    const newProductData: Product = {
      title,
      price: Number(price),
      description,
      category,
    };

    const product = await insertProduct(newProductData);
    res.status(200).json({ id: product[0], ...newProductData });
  } catch (error: unknown | Error) {
    next(error);
  }
};

const getAProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (id && typeof id === "number") {
      const product: Product[] = await selectAProduct(id);
      res.status(200).json(product[0]);
    } else {
      throw new Error("ID is not a number");
    }
  } catch (error: unknown | Error) {
    next(error);
  }
};

const starterData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    insertStarterData();
    res.send({ msg: "OK" });
  } catch (error: unknown | Error) {
    next(error);
  }
};

export { getAllProducts, starterData, getAProduct, newProduct };
