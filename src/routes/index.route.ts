// index.route.ts
import { Router, Request, Response } from 'express';

class IndexRoute {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Health check route
    this.router.get(`${this.path}health`, this.healthCheck);

    // Additional general application routes can be added here
  }

  private healthCheck(req: Request, res: Response) {
    res.status(200).send({ status: 'UP', message: 'Exa Monster backend is healthy and running' });
  }
}

export default IndexRoute;
