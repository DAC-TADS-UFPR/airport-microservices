import api from "./api";
import { TForm } from "@/hooks/useForm";
import setCookieToken from "@/utils/setCookieToken";
import deleteCookieToken from "@/utils/deleteCookieToken";

export async function login({ payload, tokenFCM }: { payload: { form: TForm }; tokenFCM?: string }) {
  const { login, senha } = payload.form;
  try {
    deleteCookieToken();
    const requestBody: Record<string, string> = {
      login: login.value,
      senha: senha.value,
    };
    if (tokenFCM) {
      requestBody.tokenFCM = tokenFCM;
    }
    const { data } = await api.post("/login", requestBody);
    const { accessToken, expire_in } = data;
    setCookieToken({ accessToken, expire_in });
    return data;
  } catch (error: any) {
    throw error?.response?.data?.message || error?.message;
  }
}
