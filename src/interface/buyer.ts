import { ReactNode } from 'react';

export interface IProductCard {
  id: string;
  title: string;
  imageUrl: string;
  oldPrice?: string;
  newPrice: string;
  newProd?: string;
  sale?: string;
  off?: string;
  description: string;
  weight: string;
  dimensions: string;
  capColors: string[];
  imageList?: Array<{ id: string; imageUrl: string }>;
}
export interface IBlogCard {
  id: string;
  title: string;
  contents: string;
  imageUrl: string;
}

export interface TabProps {
  id: string;
  title: string;
  comps?: ReactNode;
  activeClass: string;
  notActiveClass: string;
  activeTab?: string;
  setActiveTab?: (id: string) => void;
}
