// logger.ts
import { createLogger, format, transports } from 'winston';
import { StreamOptions } from 'morgan';

// ... existing logger setup

// Create a write stream for morgan that writes to your winston logger
const morganStream: StreamOptions = {
  write: (message: string): void => {
    // Use the 'info' log level so the output will be picked up by both transports (console and file)
    logger.info(message.trim());
  },
};

export { logger, morganStream };
