export class UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  image?: string | null;
}

export class UserSession {
  accessToken: string;
  user: UserInfo;
}
