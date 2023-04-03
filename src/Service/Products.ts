import repositories from "../Repositories/Products";
import { CategoryFromDb, Product, ProductForDB } from "../types";

const insertStarterData = async () => {
  const allCategoriesPromise: String[] = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());

  const allProductsPromise: Product[] = await fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());

  const allProductsFormatedData: ProductForDB[] = allProductsPromise.map(
    ({ title, price, description, category }) => ({
      title,
      price,
      description,
      category_id:
        1 + allCategoriesPromise.findIndex((item: String) => item === category),
    })
  );

  const catories: CategoryFromDb[] = allCategoriesPromise.map((category) => ({
    name: category,
  }));
  repositories.insertCategories(catories);
  repositories.insertProducts(allProductsFormatedData);
  repositories.insertRatings(makeRatings());
};

const insertProduct = async (newProductData: Product) => {
  const { category, ...data } = newProductData;

  const categoryId = await repositories.findAllCategories(category);
  if (!categoryId[0].id) {
    throw new Error("Category not Found");
  }

  return repositories.insertProducts({
    ...data,
    category_id: categoryId[0].id,
  });
};

const makeRatings = () => {
  const ratings = [];
  for (let i = 1; i < 21; i++) {
    for (let j = 0; j < 20; j++) {
      ratings.push({
        rate: Math.floor(Math.random() * 5),
        product_id: i,
      });
    }
  }

  return ratings;
};

const selectAllProducts = async () => {
  return await repositories.selectAllProducts();
};

const selectAProduct = async (id: number) => {
  return await repositories.selectAllProducts(id);
};

export { insertStarterData, selectAllProducts, selectAProduct, insertProduct };
