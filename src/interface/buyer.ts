export interface IProductCard {
  id: string;
  title: string;
  imageUrl: string;
  oldPrice: string;
  newPrice: string;
  newProd?: string;
  sale?: string;
  off?: string;
}
export interface IBlogCard {
  id: string;
  title: string;
  contents: string;
  imageUrl: string;
}
