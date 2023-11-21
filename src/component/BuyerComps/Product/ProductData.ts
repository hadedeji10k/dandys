import { images } from '@/exports/images';
import { IProductCard } from '@/interface';

export const product: IProductCard[] = [
  {
    id: "1",
    title: "Hair Shampoo 10ml",
    imageUrl: images.productImage,
    oldPrice: "5,450",
    newPrice: "2,450",
    newProd: "New",
    off: "20% Off",
    description:
      "Our 93 percent naturally-derived shampoo contains ginseng and ginger, both of which increase blood flow to the scalp to encourage hair growth. It contains Biotin, keratin, and zinc.",
    weight: "1 KG",
    dimensions: "15 × 12 × 18CM",
    capColors: ["Green", "Black", "Red", "Yellow", "Blue"],
    imageList: [
      { id: "1", imageUrl: images.productImage },
      { id: "2", imageUrl: images.face2 },
      { id: "3", imageUrl: images.face3 },
      { id: "4", imageUrl: images.face4 },
    ],
  },
  {
    id: "2",
    title: "Hair Shampoo 10ml",
    imageUrl: images.productImage,
    oldPrice: "5,450",
    newPrice: "2,450",
    newProd: "New",
    off: "20% Off",
    description:
      "Our 93 percent naturally-derived shampoo contains ginseng and ginger, both of which increase blood flow to the scalp to encourage hair growth. It contains Biotin, keratin, and zinc.",
    weight: "1 KG",
    dimensions: "15 × 12 × 18CM",
    capColors: ["Green", "Black", "Red", "Yellow", "Blue"],
    imageList: [
      { id: "1", imageUrl: images.productImage },
      { id: "2", imageUrl: images.face2 },
      { id: "3", imageUrl: images.face3 },
      { id: "4", imageUrl: images.face4 },
    ],
  },
];
