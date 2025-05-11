import { TForm } from "@/hooks/useForm";

import api from "./api";

export async function createUser({ payload }: { payload: { form: TForm } }) {
  const { name, email, cpf, complement, cep, city, street, neighborhood, number, state } = payload.form;
  try {
    const { data } = await api.post(`/clientes`, {
      name: name.value,
      email: email.value,
      cpf: cpf.value,
      complement: complement.value,
      cep: cep.value,
      city: city.value,
      street: street.value,
      neighborhood: neighborhood.value,
      number: number.value,
      state: state.value,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}
