export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
