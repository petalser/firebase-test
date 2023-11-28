import CryptoJS from "crypto-js";

export const useDecrypt = () => {
  const decrypt = (message: string, key: string) => {
    if (message === "") return "no data";
    try {
      const bytes = CryptoJS.AES.decrypt(message, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      return decrypted === "" ? message : decrypted;
    } catch (err) {
      console.error("Decryption failed:", err, message);

      return message;
    }
  };
  return decrypt;
};
