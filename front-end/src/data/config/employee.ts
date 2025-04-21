import { TForm } from "@/hooks/useForm";
import api from "./api";

export async function createEmployee({ payload }: { payload: { form: TForm } }) {
  const { name, email, cpf, phone } = payload.form;
  try {
    const { data } = await api.post(`/funcionarios`, {
      name: name.value,
      email: email.value,
      cpf: cpf.value,
      phone: phone.value,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}
