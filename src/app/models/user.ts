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
