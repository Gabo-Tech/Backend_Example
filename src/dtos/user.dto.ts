// user.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  public email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  public password: string;

  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  public firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  public lastName?: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  public email: string;

  @IsNotEmpty({ message: 'Password is required' })
  public password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  public email?: string;

  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  public firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  public lastName?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  public password: string;
  // Include other optional fields that can be updated
}
