import App from './app';
import validateEnv from './utils/validateEnv';
import IndexRoute from './routes/index.route';
import AuthRoute from './routes/auth.route';
import FileRoute from './routes/file.route';

validateEnv();

// Create an array of your route instances
const routes = [new IndexRoute(), new AuthRoute(), new FileRoute()];
// Create an instance of your `App` class with the routes
const app = new App(routes);

// Start the server by calling the `listen` method
app.listen();
