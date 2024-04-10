import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import HttpException from '../exceptions/httpException';
import argon2 from 'argon2';
import { UserEntity } from '../entities/user.entity';
class UserService {

  public async createUser(userData: CreateUserDto): Promise<User> {
    const existingUser = await UserEntity.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new HttpException(409, `Email ${userData.email} already exists`);
    }

    const hashedPassword = await argon2.hash(userData.password, { type: argon2.argon2id });
    const newUser = await UserEntity.create({ ...userData, password: hashedPassword });
    await UserEntity.save(newUser);

    return newUser;
  }

  public async getUserById(userId: string): Promise<User | null> {
    const user = await UserEntity.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    return user;
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(userId); // This already throws an error if not found

    if (userData.email && userData.email !== user.email) {
      const existingUser = await UserEntity.findOne({ where: { email: userData.email } });
      if (existingUser) {
        throw new HttpException(409, `Email ${userData.email} already exists`);
      }
    }

    if (userData.password) {
      userData.password = await argon2.hash(userData.password, { type: argon2.argon2id });
    }

    await UserEntity.update(userId, { ...userData });

    const updatedUser = await this.getUserById(userId); // Fetch to get updated data
    return updatedUser!;
  }

  public async deleteUser(userId: string): Promise<void> {
    const user = await this.getUserById(userId); // This already throws an error if not found
    await UserEntity.delete({ id: userId });
  }
}

export default UserService;
