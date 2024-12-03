export type user = {
  id: number;
  login: string;
  nickname: string;
  mail: string;
  creationDate: Date;
  likes: number;
  profilePicture: File;
  noOfThreads: number;
  role: number;
};

export type addUser = {
  login: string;
  email: string;
  password: string;
};

export type loginUser = {
  loginOrEmail: string;
  password: string;
};

export type updateNickname = {
  id: number;
  nickname: string;
};

export type updateMail = {
  id: number;
  newEMail: string;
  password: string;
};

export type updatePassword = {
  id: number;
  oldPassword: string;
  newPassword: string;
};

export type updateImage = {
  id: number;
  image: string;
};
