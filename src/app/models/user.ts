export type user = {
  id: number;
  name: string;
  email: string;
  role: number;
}

export type addUser = {
  login: string;
  email: string;
  password: string;
}

export type loginUser = {
  loginOrEmail: string;
  password: string;
}

export type updateUserParam = {
  id: number;
  param: string;
}

export type updateMail = {
  id: number;
  newEMail: string;
  password: string;
}

export type updatePassword = {
  id: number;
  oldPassword: string;
  newPassword: string;
}
