// crypto.ts
import { KeyGen768, Encrypt768, Decrypt768 } from 'crystals-kyber';

/**
 * Generates a public and private key pair.
 * @returns A tuple where the first element is the public key and the second is the private key.
 */
export function generateKeyPair(): [Buffer, Buffer] {
  return KeyGen768();
}

/**
 * Encrypts a message using a given public key.
 * @param publicKey The public key to use for encryption.
 * @returns A tuple where the first element is the encrypted message (ciphertext) and the second is the shared secret.
 */
export function encryptMessage(publicKey: Buffer): [Buffer, Buffer] {
  return Encrypt768(publicKey);
}

/**
 * Decrypts a message using a given private key.
 * @param ciphertext The ciphertext to decrypt.
 * @param privateKey The private key to use for decryption.
 * @returns The shared secret if decryption is successful.
 */
export function decryptMessage(ciphertext: Buffer, privateKey: Buffer): Buffer {
  return Decrypt768(ciphertext, privateKey);
}

/**
 * Runs test vectors to ensure compatibility with the C implementation based on known cases.
 * @returns true if all test runs are successful, false otherwise.
 */
export function runCryptoTests(): boolean {
  try {
    // The Test768 function should throw an error if any test fails.
    // Replace with actual test invocation if different for the library used.
    // This is a placeholder for how you might call a test function.
    KeyGen768.Test768();
    return true;
  } catch (error) {
    console.error('Crypto test failed', error);
    return false;
  }
}
