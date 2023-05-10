interface IUserCreate {
  name: string;
  email: string;
  password: string;
  picture_url: string;
}

interface ILogin {
  email: string;
  password: string;
}
