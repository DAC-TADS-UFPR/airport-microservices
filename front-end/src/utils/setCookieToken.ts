"use server";

import { cookies } from "next/headers";

/**
 * Store the raw JWT as an HttpOnly cookie named "access_token".
 * @param tokenParams.access_token - JWT string returned from login.
 * @param tokenParams.expire_in - Lifetime in seconds.
 */
const setCookieToken = ({ accessToken, expire_in }: { accessToken: string; expire_in: number }) => {
  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: expire_in,
  });
};

export default setCookieToken;
