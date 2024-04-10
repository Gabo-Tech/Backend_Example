// validateEnv.ts
import { cleanEnv, str, port } from 'envalid';

/**
 * Validates the environment variables.
 */
function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    PORT: port({ default: 3000 }),
    // Add other environment variables here
    DATABASE_HOST: str(),
    DATABASE_PORT: port(),
    DATABASE_USER: str(),
    DATABASE_PASSWORD: str(),
  });
}

export default validateEnv;
