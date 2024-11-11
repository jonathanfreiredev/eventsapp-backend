import { User } from '../entities/user.entity';
import { UserResponse } from '../interfaces/user-response.interface';

export const getUserResponseDto = (user: User): UserResponse => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
