export interface IUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pictureUrl: string;
}

export interface ILogin {
  email: string;
  password: string;
}
