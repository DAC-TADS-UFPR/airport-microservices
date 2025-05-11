"use server";

import { cookies } from "next/headers";

/**
 * Remove the "access_token" cookie on logout or before login.
 */
const deleteCookieToken = () => {
  cookies().delete("accessToken");
};

export default deleteCookieToken;
