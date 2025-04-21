import jwt from "jsonwebtoken";
const key = process.env.NEXT_PUBLIC_ENCRYPT || "";

export function encrypt(data: any): string | undefined | null {
  try {
    const token = jwt.sign(data, key);
    return token;
  } catch (error) {
    console.error("Error encrypting data:", error);
    return null;
  }
}

export function decrypt(data: string | undefined): any | null {
  try {
    if (!data) return;
    const resp = jwt.verify(data, key);
    return resp;
  } catch (error) {
    console.error("Error decrypting token:", error);
    return null;
  }
}
