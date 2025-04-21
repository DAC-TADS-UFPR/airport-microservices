"use server";
import { cookies } from "next/headers";

const deleteCookieToken = () => {
  cookies().delete(":token");
};

export default deleteCookieToken;
