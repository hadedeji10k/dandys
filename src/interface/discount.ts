export interface ICreateDiscount {
  title: string;
  description?: string;
  code: string;
  amount?: number;
  percentage?: number;
  discountValueType?: "PERCENTAGE" | "FIXED_AMOUNT";
  numberOfDiscounts: number;
  startDate: string | Date;
  endDate: string | Date;
  type: "OFF_PRODUCT" | "OFF_ORDER" | "BUY_GET";
  noOfBuy?: number;
  noOfGet?: number;
}

export interface IDiscount {
  id: string;
  title: string;
  description?: string;
  code: string;
  amount?: number;
  percentage?: number;
  discountValueType?: "PERCENTAGE" | "FIXED_AMOUNT";
  numberOfDiscounts: number;
  usedDiscounts: number;
  startDate: string | Date;
  endDate: string | Date;
  status: "ACTIVE" | "EXPIRED";
  type: "OFF_PRODUCT" | "OFF_ORDER" | "BUY_GET";
  noOfBuy?: number;
  noOfGet?: number;
}
