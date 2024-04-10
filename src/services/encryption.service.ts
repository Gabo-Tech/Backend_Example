// encryption.service.ts
import kyber from 'crystals-kyber';

class EncryptionService {
  // Generates a new Kyber keypair
  public async generateKeypair() {
    const keypair = kyber.KeyGen768();
    return {
      publicKey: keypair[0],
      privateKey: keypair[1],
    };
  }

  // Encrypts data using a Kyber public key
  public async encryptData(data: Buffer, publicKey: Buffer) {
    const encryptedData = kyber.Encrypt768(publicKey, data);
    return encryptedData;
  }

  // Decrypts data using a Kyber private key
  public async decryptData(encryptedData: Buffer, privateKey: Buffer) {
    const decryptedData = kyber.Decrypt768(encryptedData, privateKey);
    return decryptedData;
  }

  public async encryptFile(filePath: string, publicKey: Buffer): Promise<Buffer> {
    // Read the file content into a buffer
    const fileData = fs.readFileSync(filePath);
    // Encrypt the file data using the public key
    const encryptedData = kyber.Encrypt768(publicKey, fileData);
    return encryptedData;
  }

  // Method for decrypting files using a private key
  public async decryptFile(encryptedData: Buffer, privateKey: Buffer, outputPath: string): Promise<void> {
    // Decrypt the data using the private key
    const decryptedData = kyber.Decrypt768(encryptedData, privateKey);
    // Write the decrypted data to the specified output path
    fs.writeFileSync(outputPath, decryptedData);
  }

  // Method for securely generating and storing keypairs
  public async generateAndStoreKeypair(userId: string): Promise<void> {
    const { publicKey, privateKey } = await this.generateKeypair();
    // Securely store the publicKey and privateKey associated with the userId
    // This could involve storing them in a database with encryption or using a secure key management system
  }

  // Method for retrieving a stored keypair for a user
  public async retrieveKeypair(userId: string): Promise<{publicKey: Buffer, privateKey: Buffer}> {
    // Retrieve the publicKey and privateKey associated with the userId from storage
    // This would involve querying a database or key management system
    return { publicKey: Buffer.from(''), privateKey: Buffer.from('') }; // Placeholder return
  }
  public generateSalt(length: number = 16): string {
    return randomBytes(length).toString('hex');
  }

  // Method for hashing data (e.g., passwords) with a salt
  public async hashData(data: string, salt: string): Promise<string> {
    // Using scrypt for secure hashing; feel free to adjust parameters as needed
    const buf = (await scrypt(data, salt, 64)) as Buffer;
    return `${buf.toString('hex')}`;
  }

  // Method for generating a cryptographically secure random token
  public generateRandomToken(length: number = 32): string {
    return randomBytes(length).toString('hex');
  }
}

export default EncryptionService;
