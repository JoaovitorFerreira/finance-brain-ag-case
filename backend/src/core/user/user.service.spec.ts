import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { jest } from '@jest/globals';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'Password123!',
      };

      const result = { id: 1, ...createUserDto };
      jest.spyOn(userRepository, 'save').mockResolvedValue(result);

      expect(await userService.createUser(createUserDto)).toEqual(result);
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createUserDto),
      );
    });

    it('should handle errors', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'Password123!',
      };

      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        'Database error',
      );
    });
  });
  describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserService,
          {
            provide: getRepositoryToken(User),
            useValue: {
              save: jest.fn(),
              find: jest.fn(),
              findOneBy: jest.fn(),
              delete: jest.fn(),
            },
          },
        ],
      }).compile();

      userService = module.get<UserService>(UserService);
      userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('findAllUser', () => {
      it('should return an array of users', async () => {
        const result = [{ id: 1, name: 'John Doe' }];
        jest.spyOn(userRepository, 'find').mockResolvedValue(result);

        expect(await userService.findAllUser()).toBe(result);
        expect(userRepository.find).toHaveBeenCalled();
      });
    });

    describe('viewUser', () => {
      it('should return a single user by ID', async () => {
        const result = { id: 1, name: 'John Doe' };
        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(result);

        expect(await userService.viewUser(1)).toBe(result);
        expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      });
    });

    describe('updateUser', () => {
      it('should update a user and return the updated user', async () => {
        const updateUserDto: UpdateUserDto = {
          name: 'John Doe Updated',
        };

        const existingUser = {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          username: 'johndoe',
          password: 'pass',
        };
        const result = { ...existingUser, ...updateUserDto };

        jest.spyOn(userRepository, 'save').mockResolvedValue(result);
        jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(existingUser);

        expect(await userService.updateUser(1, updateUserDto)).toBe(result);
        expect(userRepository.save).toHaveBeenCalledWith(
          expect.objectContaining(updateUserDto),
        );
      });
    });

    describe('removeUser', () => {
      it('should remove a user by ID', async () => {
        const result = { affected: 1 };
        jest.spyOn(userRepository, 'delete').mockResolvedValue(result);

        expect(await userService.removeUser(1)).toBe(result);
        expect(userRepository.delete).toHaveBeenCalledWith(1);
      });
    });
  });
});
