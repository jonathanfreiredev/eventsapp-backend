import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUser } from '../interfaces/authenticated-request.interface';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOneByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockUser = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data without password if email and password are valid', async () => {
      const password = 'plaintextpassword';

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser(mockUser.email, password);

      expect(usersService.findOneByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(result).toEqual({
        id: mockUser.id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
      });
    });

    it('should return null if email is invalid', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null);

      const result = await service.validateUser('invalid@example.com', 'password');

      expect(usersService.findOneByEmail).toHaveBeenCalledWith('invalid@example.com');
      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser(mockUser.email, 'wrongpassword');

      expect(usersService.findOneByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(result).toBeNull();
    });
  });

  describe('generateJWT', () => {
    it('should generate a valid JWT token and return user session details', () => {
      const mockUser: AuthenticatedUser = {
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        image: null,
      };
      const mockToken = 'jwt-token';

      mockJwtService.sign.mockReturnValue(mockToken);

      const result = service.generateJWT(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id });
      expect(result).toEqual({
        accessToken: mockToken,
        user: {
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
          image: null,
        },
      });
    });
  });
});
