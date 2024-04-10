// user.controller.ts
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service'; // Your user service
import { UpdateUserDto } from '../dtos/user.dto';

class UserController {
  public userService = new UserService();

  public getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json({ data: user, message: 'User profile fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
      const userData: UpdateUserDto = req.body;
      const updateUser = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUser, message: 'User updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
      await this.userService.deleteUser(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
