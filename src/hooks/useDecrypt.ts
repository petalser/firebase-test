import CryptoJS from "crypto-js";

export const useDecrypt = () => {
  const decrypt = (message, key) => {
    const bytes = CryptoJS.AES.decrypt(message, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(decrypted);
    return decrypted;
  };
  return decrypt;
};
