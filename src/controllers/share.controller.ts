// share.controller.ts
import { Request, Response, NextFunction } from 'express';
import ShareService from '../services/share.service';
import { CreateShareLinkDto } from '../dtos/share.dto';
import validationMiddleware from '../middleware/validation.middleware';

class ShareController {
  public shareService = new ShareService();

  public createShareLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { fileId, recipientId, accessLevel } = req.body;
      const shareLink = await this.shareService.createShareLink(fileId, recipientId, accessLevel);

      res.status(201).json({ message: 'Share link created successfully', data: shareLink });
    } catch (error) {
      next(error);
    }
  };

  public updateSharePermissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { shareId, newAccessLevel } = req.body;
      await this.shareService.updateSharePermissions(shareId, newAccessLevel);

      res.status(200).json({ message: 'Share permissions updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public listSharedFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId;
      const sharedFiles = await this.shareService.listSharedFiles(userId);

      res.status(200).json({ message: 'Shared files fetched successfully', data: sharedFiles });
    } catch (error) {
      next(error);
    }
  };

  public revokeShareLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shareId = req.params.shareId;
      await this.shareService.revokeShareLink(shareId);

      res.status(200).json({ message: 'Share link revoked successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getShareDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shareId = req.params.shareId;
      const shareDetails = await this.shareService.getShareDetails(shareId);

      res.status(200).json({ message: 'Share details fetched successfully', data: shareDetails });
    } catch (error) {
      next(error);
    }
  };
  // Additional methods for managing shares can be added here
}

export default ShareController;
