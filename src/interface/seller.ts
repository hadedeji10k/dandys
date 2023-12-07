export interface ISellerPreference {
  newOrder: boolean;
  cancellationOrder: boolean;
  returnOrder: boolean;
}

export type DocumentType =
  | "NIN"
  | "DRIVER'S_LICENSE"
  | "VOTER'S_CARD"
  | "INTL_PASSPORT"
  | "";

export interface ICreateSellerInformation {
  managerFullName: string;
  shopName: string;
  cacNumber: string;
  documentType: DocumentType;
  documentNumber: string;
  documentImage?: string;
  phoneNumber: string;
  accountType: "INDIVIDUAL" | "COMPANY";
}

export interface ICustomer {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    username: string;
    avatar: string;
  };
  numberOfOrders: number;
  amountOfTotalOrders: number;
}

export interface ISubscriptionDetails {
  isActive: boolean;
  currentPlan: "FREE" | "BASIC" | "PREMIUM";
  lastSubscriptionDate: string | Date;
  expiryDate: string | Date;
  remainingDays: number;
}
