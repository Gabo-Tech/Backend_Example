// share.dto.ts
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';

// Enum for specifying different levels of access permissions
export enum AccessLevel {
  VIEW = 'view',
  EDIT = 'edit',
}

export class CreateShareLinkDto {
  @IsNotEmpty()
  @IsString()
  public fileId: string;

  @IsOptional()
  @IsEnum(AccessLevel, {
    message: 'Access level must be either "view" or "edit"',
  })
  public accessLevel?: AccessLevel = AccessLevel.VIEW;
}

export class ShareFileByEmailDto {
  @IsNotEmpty()
  @IsString()
  public fileId: string;

  @IsNotEmpty()
  @IsEmail()
  public recipientEmail: string;

  @IsOptional()
  @IsEnum(AccessLevel, {
    message: 'Access level must be either "view" or "edit"',
  })
  public accessLevel?: AccessLevel = AccessLevel.VIEW;
}

export class UpdateShareAccessDto {
  @IsNotEmpty()
  @IsString()
  public shareId: string;

  @IsNotEmpty()
  @IsEnum(AccessLevel, {
    message: 'Access level must be either "view" or "edit"',
  })
  public newAccessLevel: AccessLevel;
}
