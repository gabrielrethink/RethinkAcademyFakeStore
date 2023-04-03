interface ProductFromDB {
  id?: number;
  title: string;
  price: number;
  description: string;
}

type RateFromDb = {
  id?: number;
  rate: number;
  product_id: number;
};

type CategoryFromDb = {
  id?: number;
  name: String;
};

type Rating = {
  rate: number;
  count: number;
};

interface ProductForDB extends ProductFromDB {
  category_id: number;
}

interface Product extends ProductFromDB {
  rating?: Rating;
  category: string;
}

export {
  Product,
  ProductFromDB,
  Rating,
  RateFromDb,
  CategoryFromDb,
  ProductForDB,
};
