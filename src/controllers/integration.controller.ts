// integration.controller.ts
import { Request, Response, NextFunction } from 'express';
import IntegrationService from '../services/integration.service';

class IntegrationController {
  public integrationService = new IntegrationService();

  public syncFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId; // Assuming files are user-specific
      await this.integrationService.syncFiles(userId);

      res.status(200).json({ message: 'Files synchronized successfully' });
    } catch (error) {
      next(error);
    }
  };

  public importFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, externalServiceId } = req.body; // Assuming you need user and external service info
      const importedFiles = await this.integrationService.importFiles(userId, externalServiceId);

      res.status(200).json({ message: 'Files imported successfully', data: importedFiles });
    } catch (error) {
      next(error);
    }
  };

  public disconnectIntegration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, externalServiceId } = req.body; // Assuming you need user and external service info to disconnect
      await this.integrationService.disconnectIntegration(userId, externalServiceId);

      res.status(200).json({ message: 'Integration disconnected successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getIntegrationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, externalServiceId } = req.params; // Assuming the request includes user and external service identifiers
      const status = await this.integrationService.getIntegrationStatus(userId, externalServiceId);

      res.status(200).json({ message: 'Integration status retrieved successfully', data: status });
    } catch (error) {
      next(error);
    }
  };

  // Additional methods for managing integrations can be added here
}

export default IntegrationController;
