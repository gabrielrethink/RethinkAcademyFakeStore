import { knex } from "knex";
import config from "../../knexfile";

const knexInstance = knex(config["development"]);

const findAllCategories = async (category?: string) =>
  await knexInstance
    .select("id")
    .from("Categories")
    .where((builder) => {
      if (category) builder.where("name", category);
    });

const insertProducts = async (insertData: any) =>
  await knexInstance("Products").insert(insertData);

const insertCategories = async (insertData: any) =>
  await knexInstance("Categories").insert(insertData);

const insertRatings = async (insertData: any) =>
  await knexInstance.batchInsert("Ratings", insertData, 20);

const selectAllProducts: (id?: number) => Promise<any[]> = async (id) => {
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
  insertRatings,
  selectAllProducts,
  findAllCategories,
};
