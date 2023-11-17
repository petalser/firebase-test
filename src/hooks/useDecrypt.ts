import CryptoJS from "crypto-js";

export const useDecrypt = () => {
  const decrypt = (message: string, key: string) => {
    const bytes = CryptoJS.AES.decrypt(message, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypted: " + decrypted);
    return decrypted;
  };
  return decrypt;
};
