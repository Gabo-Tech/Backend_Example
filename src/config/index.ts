import dotenv from 'dotenv';

// Initialize configuration from .env file
dotenv.config();

// Define a function to get the environment variable or throw an error if it's not defined
function getEnvVariable(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}

// Export your environment variables
export const NODE_ENV = getEnvVariable('NODE_ENV', 'development');
export const PORT = getEnvVariable('PORT', '3000');
export const LOG_FORMAT = getEnvVariable('LOG_FORMAT', 'dev');
export const ORIGIN = getEnvVariable('ORIGIN', '*');
export const CREDENTIALS = getEnvVariable('CREDENTIALS', 'true');
// Add other configuration variables as needed

// If using TypeScript, you may also want to define and export a type for your config
export type Config = {
  NODE_ENV: string;
  PORT: string;
  LOG_FORMAT: string;
  ORIGIN: string;
  CREDENTIALS: string;
  // ...other variables
};

// Export a config object if needed
export const config: Config = {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  ORIGIN,
  CREDENTIALS,
  // ...other variables
};
