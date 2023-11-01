export interface ICreateProduct {
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
}