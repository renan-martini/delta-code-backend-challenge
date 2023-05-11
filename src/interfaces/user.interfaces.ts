export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  picture_url: string;
}

export interface ILogin {
  email: string;
  password: string;
}
