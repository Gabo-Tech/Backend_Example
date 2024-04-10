// file.controller.ts
import { Request, Response, NextFunction } from 'express';
import FileService from '../services/file.service';
import { UploadedFile } from 'express-fileupload';

class FileController {
  public fileService = new FileService();

  public uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // 'file' is the name of the <input type="file" name="file"> in the form
      let uploadedFile = req.files.file as UploadedFile;
      const file = await this.fileService.saveFile(uploadedFile);

      res.status(201).json({ message: 'File uploaded successfully', data: file });
    } catch (error) {
      next(error);
    }
  };

  public downloadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fileId = req.params.fileId;
      const file = await this.fileService.getFile(fileId);

      res.setHeader('Content-Disposition', 'attachment; filename=' + file.filename);
      res.setHeader('Content-Type', file.contentType);
      
      // Assuming getFile returns a stream or path. Adjust accordingly.
      file.stream.pipe(res);
    } catch (error) {
      next(error);
    }
  };
  public listFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId; // Assuming you're identifying users somehow
      const files = await this.fileService.listUserFiles(userId);

      res.status(200).json({ message: 'Files fetched successfully', data: files });
    } catch (error) {
      next(error);
    }
  };

  public shareFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { fileId, recipientId , accessLevel} = req.body;
      const userId = req.params.userId; // Assuming you're identifying users somehow
      const shareInfo = await this.fileService.shareFile(fileId, userId, recipientId, accessLevel);

      res.status(200).json({ message: 'File shared successfully', data: shareInfo });
    } catch (error) {
      next(error);
    }
  };
  // Additional methods for file management (e.g., listing files, sharing files) can be added here
}

export default FileController;
