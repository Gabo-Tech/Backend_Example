// auth.service.ts
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import argon2 from 'argon2';

class AuthService {
  private userRepository = getRepository(User);

  public async register(email: string, password: string): Promise<User | null> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    const newUser = this.userRepository.create({ email, password: hashedPassword });

    await this.userRepository.save(newUser);
    return newUser;
  }

  public async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, password, { type: argon2.argon2id });
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Assuming you're using sessions or JWT tokens for authentication
    // You would also create and return the session or token here

    return user; // For simplicity, returning the user directly
  }
  public async initiatePasswordReset(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = createPasswordResetToken(user.id);
    await sendPasswordResetEmail(user.email, resetToken);
    // Store the reset token hash in the database if necessary, depending on your token invalidation strategy
  }

  public async resetPassword(userId: number, token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    if (!verifyToken(token)) {
      throw new Error('Invalid or expired token');
    }

    const hashedPassword = await argon2.hash(newPassword, { type: argon2.argon2id });
    user.password = hashedPassword;
    await this.userRepository.save(user);
  }

  public async verifyEmail(userId: number, token: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    if (!verifyToken(token)) {
      throw new Error('Invalid or expired token');
    }

    user.isEmailVerified = true;
    await this.userRepository.save(user);
  }

  public async sendVerificationEmailToUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const verificationToken = createVerificationToken(user.id);
    await sendVerificationEmail(user.email, verificationToken);
    // Store the verification token hash in the database if necessary
  }

// Additional methods within AuthService class

public async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
  
    const isCurrentPasswordValid = await argon2.verify(user.password, currentPassword, { type: argon2.argon2id });
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }
  
    user.password = await argon2.hash(newPassword, { type: argon2.argon2id });
    await this.userRepository.save(user);
  }
  
  public async logout(userId: number): Promise<void> {
    // Implementation details depend on your session or token invalidation strategy.
    // For JWT tokens, consider maintaining a token blocklist or using token versioning.
    // For session-based authentication, destroy the user's session.
  }
  
  public async refreshToken(oldToken: string): Promise<string> {
    // Verify the old token and ensure it's not expired.
    // Check for any additional criteria your application requires for token refresh.
    // Issue a new token and return it.
    return 'newToken'; // Placeholder return value. Implement according to your token strategy.
  }
  
  public async getSessionInfo(userId: number): Promise<any> {
    // Fetch and return session-related information for the user.
    // This could include session expiration, the IP address of the last login, etc.
    return {}; // Placeholder return value. Adjust according to your application's needs.
  }
  
  // Additional utility methods as needed...
  
}

export default AuthService;
