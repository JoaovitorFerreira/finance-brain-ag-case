import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { validate } from 'class-validator';
import { CreateUserDto, UpdateUserDto } from './dto';
import { jest } from '@jest/globals';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findAllUser: jest.fn(),
            viewUser: jest.fn(),
            updateUser: jest.fn(),
            removeUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'joao vitor',
        email: 'joao.ferreira@example.com',
        username: 'johnnyvitor',
        password: 'Password123!',
      };

      const result = { id: 1, ...createUserDto };
      jest.spyOn(userService, 'createUser').mockResolvedValue(result);

      expect(await userController.create(createUserDto)).toEqual(result);
      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw a validation error if CreateUserDto is invalid', async () => {
      const createUserDto: CreateUserDto = {
        name: 'J',
        email: 'invalid-email',
        username: 'jd',
        password: 'pass',
      };

      const errors = await validate(createUserDto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: 1,
          name: 'joao vitor',
          email: 'joao.ferreira@example.com',
          username: 'johnnyvitor',
        },
      ];

      jest.spyOn(userService, 'findAllUser').mockResolvedValue(result);

      expect(await userController.findAll()).toBe(result);
      expect(userService.findAllUser).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const result = {
        id: 1,
        name: 'joao vitor',
        email: 'joao.ferreira@example.com',
        username: 'johnnyvitor',
      };
      jest.spyOn(userService, 'viewUser').mockResolvedValue(result);

      expect(await userController.findOne('1')).toBe(result);
      expect(userService.viewUser).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'John Doe',
      };

      const result = { id: 1, ...updateUserDto };
      jest.spyOn(userService, 'updateUser').mockResolvedValue(result);

      expect(await userController.update('1', updateUserDto)).toBe(result);
      expect(userService.updateUser).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const result = { affected: 1 };
      jest.spyOn(userService, 'removeUser').mockResolvedValue(result);

      expect(await userController.remove('1')).toBe(result);
      expect(userService.removeUser).toHaveBeenCalledWith(1);
    });
  });
});
