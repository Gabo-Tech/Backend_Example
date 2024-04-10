// file.route.ts
import { Router } from 'express';
import multer from 'multer';
import FileController from '../controllers/file.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { CreateShareLinkDto } from '../dtos/share.dto'; // Make sure to define this DTO
import validationMiddleware from '../middleware/validation.middleware';

// Configure Multer's storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the upload destination directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the file name
  },
});
const upload = multer({ storage: storage });

class FileRoute {
  public path = '/files';
  public router = Router();
  public fileController = new FileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      authMiddleware, // Use the auth middleware to protect the route
      upload.single('file'), // 'file' is the name of the file input field
      this.fileController.upload
    );
    
    this.router.get(
      `${this.path}/download/:fileId`,
      authMiddleware, // Protect the download route
      this.fileController.download
    );

    // Make sure to add the DTO definition and import it at the top
    this.router.post(
      `${this.path}/share`,
      authMiddleware,
      validationMiddleware(CreateShareLinkDto, 'body'), // Validate the incoming share data
      this.fileController.createShareLink
    );

    this.router.get(
      `${this.path}/shared`,
      authMiddleware,
      this.fileController.listSharedFiles
    );
  }
}

export default FileRoute;
