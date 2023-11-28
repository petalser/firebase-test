import CryptoJS from "crypto-js";

export const useEncrypt = () => {
  const encrypt = (message: string, key: string) => {
    if (message === "") message += "no data";
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();

    return encrypted;
  };
  return encrypt;
};
