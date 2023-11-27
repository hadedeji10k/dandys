export interface ISignUp {
  fullName: string;
  password: string;
  email: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IUpdateUser {
  username?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IVerifyOTP {
  email: string;
  otpCode: string;
}

export interface IResendOTP {
  email: string;
}

export interface IForgotPassword {
  email: string;
}

export interface ICompleteForgotPassword {
  email: string;
  otpCode: string;
  password: string;
}