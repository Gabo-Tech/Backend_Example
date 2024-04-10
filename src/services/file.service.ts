import { FileEntity } from '../entities/file.entity';
import EncryptionService from './encryption.service';
import fs from 'fs';
import path from 'path';

class FileService {
  private encryptionService = new EncryptionService();

  public async uploadFile(userId: string, fileBuffer: Buffer, filename: string): Promise<File> {
    // Optionally encrypt fileBuffer here using EncryptionService before saving
    const encryptedData = await this.encryptionService.encryptData(fileBuffer); // Assuming this method exists and fits your implementation
    
    const fileData = {
      userId,
      filename,
      // Include encrypted data, path, or other relevant information
    };
    const newFile = await FileEntity.createFile(fileData);
    return newFile;
  }

  public async downloadFile(fileId: string): Promise<Buffer> {
    const file = await FileEntity.findFileById(fileId);
    if (!file) {
      throw new Error('File not found');
    }
    // Optionally decrypt file content here if stored encrypted
    const decryptedData = await this.encryptionService.decryptData(file.encryptedData); // Assuming this method exists and fits your implementation
    return decryptedData;
  }

  public async listUserFiles(userId: string): Promise<File[]> {
    return FileEntity.findAll({where: userId = userId);
  }

  public async deleteFile(fileId: string): Promise<void> {
    await FileEntity.delete(fileId);
  }
  public async updateFileMetadata(fileId: string, metadata: object): Promise<void> {
    const file = await FileEntity.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }
    // Assuming the File entity includes a 'metadata' field of type JSON or similar
    await FileEntity.update(fileId, { metadata });
  }

  public async getSharedFiles(userId: string): Promise<File[]> {
    // Logic to retrieve files shared with the user
    // This would involve querying the 'Shares' table/entity for entries where 'sharedWithUserId' matches the given userId
    return []; // Placeholder return
  }

  public async renameFile(fileId: string, newName: string): Promise<void> {
    const file = await FileEntity.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }
    await FileEntity.update(fileId, { filename: newName });
  }

  public async moveFile(fileId: string, newLocation: string): Promise<void> {
    const file = await FileEntity.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }
    // Assuming 'path' is a property of the File entity representing the file's location
    await FileEntity.update(fileId, { path: newLocation });
    // Additional logic to physically move the file within the file system if necessary
  }

  // Method to physically delete a file from the filesystem, if applicable
  public async deletePhysicalFile(filePath: string): Promise<void> {
    fs.unlinkSync(path.join(__dirname, filePath)); // Make sure to catch and handle errors appropriately
  }

  public async getFile(fileId: string): Promise<File> {
    const file = await FileEntity.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }
    return file;
  }

  // Method to save the file to the filesystem/database
  public async saveFile(fileData: file): Promise<File> {
    const encryptedData = await this.encryptionService.encryptData(fileData);
    const newFile = new File();
    newFile.userId = fileData.userId;
    newFile.filename = fileData.filename;
    newFile.data = encryptedData; // Assuming 'data' is the field where you store your file content
    await FileEntity.create(newFile);
    return newFile;
  }

  // Method to share a file with another user
  public async shareFile(fileId: string, userId: string, sharedWithUserId: string, accessLevel: string): Promise<Share> {
    const file = await FileEntity.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }
    
    if (file.userId !== userId) {
      throw new Error('User does not own the file');
    }

    const newShare = new Share();
    newShare.fileId = fileId;
    newShare.userId = sharedWithUserId; // Assuming this is the user who will get access
    newShare.accessLevel = accessLevel;
    // Save the new share in the database
    // Assuming there is a methoFileEntity to handle this or you have a separate shareRepository
    await FileEntity.update(newShare);
    return newShare;
  }
  // Add additional file management methods as required
}

export default FileService;
