export class UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export class LoginResponse {
  accessToken: string;
  user: UserInfo;
}
