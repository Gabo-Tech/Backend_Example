import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';
import errorMiddleware from './middleware/error.middleware';
import { logger, morganStream }  from './utils/logger';
import  Routes  from './interfaces/routes.interfaces';
const credentials = CREDENTIALS === 'true';
class App {
  public app: Application;
  public port: string | number;
  public env: string; 
  
  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 3000;
    this.env = NODE_ENV || 'development';
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan('combined', { stream: morganStream }));
    this.app.use(cors({ origin: ORIGIN, credentials }));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
}

export default App;
