import CryptoJS from "crypto-js";

export const useEncrypt = () => {
  const encrypt = (message: string, key: string) => {
    if (message === "") message += "no data";
    console.log({ message });
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    // console.log(encrypted);
    return encrypted;
  };
  return encrypt;
};
