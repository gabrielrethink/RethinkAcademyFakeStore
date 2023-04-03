import { knex } from "knex";
import config from "../../knexfile";
import { CategoryFromDb, Product, ProductForDB, RateFromDb } from "../types";

const knexInstance = knex(config["development"]);

const findAllCategories: (
  category?: string
) => Promise<CategoryFromDb[]> = async (category?: string) =>
  await knexInstance
    .select()
    .from("Categories")
    .where((builder) => {
      if (category) builder.where("name", category);
    });

const insertProducts = async (insertData: ProductForDB | ProductForDB[]) =>
  await knexInstance("Products").insert(insertData);

const insertCategories = async (
  insertData: CategoryFromDb | CategoryFromDb[]
) => await knexInstance("Categories").insert(insertData);

const insertRatings = async (insertData: RateFromDb) =>
  await knexInstance("Ratings").insert(insertData);

const insertRatingsBatch = async (insertData: RateFromDb[]) =>
  await knexInstance.batchInsert("Ratings", insertData, 20);

const selectAllProducts: (id?: number) => Promise<Product[]> = async (id) => {
  const allDataFromProducts = await knexInstance
    .select(
      "Products.id",
      "Products.title",
      "Categories.name as category",
      "Products.price",
      "Products.description"
    )
    .where((builder) => {
      if (id) builder.where("Products.id", id);
    })
    .from("Products")
    .join("Categories", "Categories.id", "=", "Products.category_id")
    .join("Ratings", "Products.id", "=", "Ratings.product_id")
    .avg("rate as rate")
    .count("product_id as count")
    .groupBy("product_id");

  return allDataFromProducts.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    price: item.price,
    description: item.description,
    rating: {
      rate: item.rate,
      count: item.count,
    },
  }));
};

export default {
  insertProducts,
  insertCategories,
  insertRatings: insertRatingsBatch,
  selectAllProducts,
  findAllCategories,
};
