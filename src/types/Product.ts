export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: (string)[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
