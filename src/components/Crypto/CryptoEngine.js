import CryptoJS from "crypto-js";

class CryptoUtil {
  constructor(secretKey) {
    // Ensure secretKey is a 128-bit (16-byte) key
    this.secretKey = CryptoJS.enc.Utf8.parse(secretKey.padEnd(16, ' ')); // Padding secretKey to 16 bytes if needed
  }

  encrypt(message) {
    try {
      // Convert the message object to a JSON string
      const messageString = JSON.stringify(message);
      
      // Ensure the messageString length is a multiple of the block size (16 bytes) for NoPadding
      const blockSize = 16;
      const padding = blockSize - (messageString.length % blockSize);
      const paddedMessageString = messageString + ' '.repeat(padding);
      
      // Encrypt the padded JSON string
      const encrypted = CryptoJS.AES.encrypt(paddedMessageString, this.secretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding, // NoPadding
      }).toString();
      
      return encrypted;
    } catch (error) {
      console.error("Error during encryption:", error);
      return "";
    }
  }

  decrypt(encryptedMessage) {
    try {
      // Decrypt the message
      const decrypted = CryptoJS.AES.decrypt(encryptedMessage, this.secretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding, // NoPadding
      });
      
      // Convert the decrypted data back to a string
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      
      // Remove any padding that was added during encryption
      const unpaddedString = decryptedString.trim();
      
      // Parse the string as a JSON object
      const message = JSON.parse(unpaddedString);
      
      return message;
    } catch (error) {
      console.error("Error during decryption:", error);
      return {};
    }
  }
}

export default CryptoUtil;
