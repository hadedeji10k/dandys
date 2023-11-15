export interface IUser {
  id: string;
  avatar: string;
  date_joined: string | Date;
  email: string;
  firstName: string | null;
  fullName: string | null;
  lastName: string | null;
  username: string | null;
  phone: string | null;
  nin: string | null;
  isActive: boolean;
  userType: "BUYER" | "SELLER";
  kycCompleted: boolean;
  lastLogin: string | Date;
  has_pin: boolean;
}

export interface ICreateBankDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
}