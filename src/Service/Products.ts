import repositories from "../Repositories/Products";

const insertStarterData = async () => {
  const allCategoriesPromise: String[] = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());

  const allProductsPromise: any[] = await fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());

  const allProductsFormatedData = allProductsPromise.map(
    ({ title, price, description, category }: any) => ({
      title,
      price,
      description,
      category_id:
        1 + allCategoriesPromise.findIndex((item: String) => item === category),
    })
  );

  repositories.insertCategories(
    allCategoriesPromise.map((category: any) => ({
      name: category,
    }))
  );
  repositories.insertProducts(allProductsFormatedData);
  repositories.insertRatings(makeRatings());
};
const insertProduct = async (newProductData: any) => {
  const { category, ...data } = newProductData;

  const categoryId = repositories.findAllCategories(category);
  return repositories.insertProducts({ ...data, category_id: categoryId });
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
