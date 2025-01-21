import * as CryptoJS from "crypto-js";

// 加密函数
function encrypt(content: any, password: string): string {
  const raw = content;
  const key = CryptoJS.enc.Hex.parse(CryptoJS.SHA512(password).toString());
  const iv = CryptoJS.enc.Hex.parse(CryptoJS.MD5(password).toString());

  const encrypt = CryptoJS.AES.encrypt(JSON.stringify(raw), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypt.toString();
}

// 解密函数
function decrypt(content: string, password: string): any | null {
  const key = CryptoJS.enc.Hex.parse(CryptoJS.SHA512(password).toString());
  const iv = CryptoJS.enc.Hex.parse(CryptoJS.MD5(password).toString());

  const decrypt = CryptoJS.AES.decrypt(content, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  try {
    const data = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
    return data;
  } catch (error) {
    return null;
  }
}

// 生成随机密钥
function generateKey(length: number = 64): string {
  const characters = "abcdef0123456789";
  const charactersLength = characters.length;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
}

// 生成密钥链
function generateKeyChain(
  length: number,
  root: string = generateKey(),
): string[] {
  const result: string[] = [];
  let a = CryptoJS.enc.Hex.parse(root);
  for (let i = 0; i < length; i++) {
    result.push(a.toString());
    a = CryptoJS.SHA256(a);
  }
  return result.reverse();
}

// 解密密钥链中的每一项
function chainDecrypt(chain: string[], key: string): any[] {
  const result: any[] = [];

  for (let i = chain.length - 1; i >= 0; i--) {
    const dec = decrypt(chain[i], key);
    if (dec !== null) {
      result.push(dec);
      key = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(key)).toString();
    }
  }

  return result.reverse();
}

// 加密数据链
function chainEncrypt(data_chain: any[], root: string): string[] {
  const key_chain = generateKeyChain(data_chain.length, root);

  const result: string[] = [];
  for (let i = 0; i < data_chain.length; i++) {
    result.push(encrypt(data_chain[i], key_chain[i]));
  }

  return result;
}

// 用来规避报错
export const tempEncrypt = (data: any[]) => {
  return chainEncrypt(data, "");
};

export const decipher = (cipher: string[], key: string) => {
  return chainDecrypt(cipher, key);
};

export const cipher = (plain: String, key: string): string => {
  const hash = CryptoJS.SHA256(key + plain).toString();
  return hash;
};
