import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersService } from 'src/users/services/users.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { UserSession } from '../dto/user-session';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  const mockAuthService = {
    generateJWT: jest.fn(),
  };

  const mockUsersService = {
    create: jest.fn(),
  };

  const mockUser = {
    id: 'user123',
    firstName: 'jonathan',
    lastName: 'freire',
    email: 'test@example.com',
  };

  const mockCreateUserDto: CreateUserDto = {
    firstName: 'jonathan',
    lastName: 'freire',
    email: 'test@example.com',
    password: 'password123',
  };

  const mockToken: UserSession = {
    accessToken: 'mock-jwt-token',
    user: mockUser,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token for a valid user', async () => {
      const req = { user: mockUser } as AuthenticatedRequest;
      mockAuthService.generateJWT.mockResolvedValue(mockToken);

      const result = await controller.login(req);

      expect(authService.generateJWT).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockToken);
    });
  });

  describe('signup', () => {
    it('should create a new user and return a JWT token', async () => {
      mockUsersService.create.mockResolvedValue(mockUser);
      mockAuthService.generateJWT.mockResolvedValue(mockToken);

      const result = await controller.signup(mockCreateUserDto);

      expect(usersService.create).toHaveBeenCalledWith(mockCreateUserDto);
      expect(authService.generateJWT).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockToken);
    });
  });
});
