"use server";

import { cookies } from "next/headers";

/**
 * Store the raw JWT as an HttpOnly cookie named "access_token".
 * @param tokenParams.access_token - JWT string returned from login.
 * @param tokenParams.expire_in - Lifetime in seconds.
 */
const setCookieToken = ({ access_token, expire_in }: { access_token: string; expire_in: number }) => {
  cookies().set("access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: expire_in,
  });
};

export default setCookieToken;
