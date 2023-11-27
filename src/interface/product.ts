import { IUser } from ".";

export interface ICreateProduct {
  images?: any;
  title: string;
  description: string;
  brandName: string;
  model: string;
  vendor?: string;
  expiryDate?: string | Date;
  manufactureDate?: string | Date;
  isoNumber?: string;
  nafdacNumber?: string;
  height?: string;
  weight?: string;
  quantity: number;
  stockLimit?: number;
  costPrice?: number;
  sellingPrice?: number;
  saleStart?: string | Date;
  saleEnd?: string | Date;
  eanNumber: string;
  categoryId: string;
}

export interface ICategory {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export interface IProduct {
  id?: string;
  sku?: string;
  title: string;
  description: string;
  brandName: string;
  model: string;
  vendor?: string;
  expiryDate?: string | Date;
  manufactureDate?: string | Date;
  isoNumber?: string;
  nafdacNumber?: string;
  height?: string;
  weight?: string;
  quantity: number;
  stockLimit?: number;
  costPrice?: number;
  sellingPrice?: number;
  saleStart?: string | Date;
  saleEnd?: string | Date;
  eanNumber: string;
  categoryId: string;
  category: ICategory;
  createdAt?: Date | string;
  productImage: {
    id: string;
    filename: string;
    imageUrl: string;
  }[];
}

export interface IOrderItem {
  id: string;
  quantity: number;
  amount: number;
  productId: string;
  product: IProduct;
  orderId: string;
  Order: IOrder;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IOrder {
  description: string;
  status: string;
  amount: number;
  orderItem: IOrderItem[];
  billingAddressId: string;
  billingAddress: IBillingAddress;
  review: IReview;
  userId: string;
  user: IUser;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IReview {
  id: string;
  comment: string;
  star: string;
  orderId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IBillingAddress {
  id: string;
  street: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
