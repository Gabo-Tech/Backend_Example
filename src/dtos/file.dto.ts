// file.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  @IsString()
  public filename: string;

  @IsNotEmpty()
  @IsString()
  public contentType: string;

  // You can add other properties as needed, such as tags or description
  @IsOptional()
  @IsString()
  public description?: string;
}

export class FileDownloadDto {
  @IsNotEmpty()
  @IsString()
  public fileId: string;
}

export class FileMetadataDto {
  @IsNotEmpty()
  @IsString()
  public fileId: string;

  @IsOptional()
  @IsNumber()
  public size?: number;

  @IsOptional()
  @IsDate()
  public createdAt?: Date;

  @IsOptional()
  @IsDate()
  public updatedAt?: Date;

  // Include other file metadata properties you need, like encryption keys or user IDs
}

// If you need to handle file sharing, you could also define a DTO for that purpose:
export class FileShareDto {
  @IsNotEmpty()
  @IsString()
  public fileId: string;

  @IsNotEmpty()
  @IsString()
  public recipientId: string;

  // Define any additional properties related to file sharing, such as permissions or expiry date
}
