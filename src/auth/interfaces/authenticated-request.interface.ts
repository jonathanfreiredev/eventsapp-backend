export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string | null;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
