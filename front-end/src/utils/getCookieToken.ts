"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const getCookieToken = async () => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;
  // const auth: any = await jwtVerify(token as string, new TextEncoder().encode(process.env.NEXT_PUBLIC_ENCRYPT));
  // return auth.payload;
  return { accessToken: token };
};
export default getCookieToken;
