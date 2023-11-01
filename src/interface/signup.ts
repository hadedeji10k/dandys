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