import CryptoJS from "crypto-js";

export const useEncrypt = () => {
  const encrypt = (message, key) => {
    const encrypted = CryptoJS.AES.encrypt(message, key).toString()
    // console.log(encrypted);
    return encrypted;
  };
  return encrypt;
};
