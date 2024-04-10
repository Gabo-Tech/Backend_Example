// auth.route.ts
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';
import validationMiddleware from '../middleware/validation.middleware';

class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto, 'body'),
      this.authController.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginUserDto, 'body'),
      this.authController.login
    );
    this.router.post(`${this.path}/logout`, this.authController.logout);
  }
}

export default AuthRoute;
