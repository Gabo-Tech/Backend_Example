// crypto.interface.ts

// Interface for key generation results
export interface KeyPair {
    publicKey: Buffer;
    privateKey: Buffer;
  }
  
  // Interface for encryption results
  export interface EncryptionResult {
    ciphertext: Buffer;
    sharedSecret: Buffer; // Or any other relevant data returned by the encryption process
  }
  
  // Interface for decryption results
  export interface DecryptionResult {
    plaintext: Buffer;
    sharedSecret: Buffer; // Or any other relevant data obtained through the decryption process
  }
  