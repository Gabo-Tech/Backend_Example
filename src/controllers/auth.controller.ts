// auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';
import UserService from '../services/user.service'; // Assume this service handles database operations for users
import { SessionContainer, createNewSession, getSession, revokeAllSessionsForUser } from 'supertokens-node/recipe/session';
import { RecipeUserId } from 'supertokens-node';

class AuthController {
  public userService = new UserService();

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const hashedPassword = await argon2.hash(userData.password, { type: argon2.argon2id });
      const createUser = await this.userService.createUser({ ...userData, password: hashedPassword });

      res.status(201).json({ data: createUser, message: 'User successfully registered.' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password }: LoginUserDto = req.body;
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        res.status(401).json({ message: 'Email or password is incorrect.' });
        return;
      }

      const isPasswordMatching = await argon2.verify(user.password, password);
      if (!isPasswordMatching) {
        res.status(401).json({ message: 'Email or password is incorrect.' });
        return;
      }
      const userId = new RecipeUserId(user.id.toString());
      // Assuming createNewSession is a function from your session management library (e.g., SuperTokens)
      const session: SessionContainer = await createNewSession(res, user.id.toString(), 'tentantId', userId);

      res.status(200).json({ message: 'Login successful', userId: user.id, session });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Assuming getSession and revokeAllSessionsForUser are functions from your session management library
      const session = await getSession(req, res);
      await revokeAllSessionsForUser(session.getUserId());

      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
