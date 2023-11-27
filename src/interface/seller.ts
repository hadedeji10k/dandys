export interface ISellerPreference {
  newOrder: boolean;
  cancellationOrder: boolean;
  returnOrder: boolean;
}

export interface ICreateSellerInformation {
  managerFullName: string;
  businessImage?: string;
  shopName: string;
  cacNumber: string;
  documentType: string;
  document: string;
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