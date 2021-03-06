export type ErrorsType = {
  [key: string]: string;
};

export type RegisterUserType = {
  password: string;
  username: string;
  gender: string;
  email: string;
};
export type LoginUserType = {
  password: string;
  email: string;
};

export type CreateConfessionType = {
  content: string;
  tags: string;
  shareAs: string;
  profile?: string | any;
};
