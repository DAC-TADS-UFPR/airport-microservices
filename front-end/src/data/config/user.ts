import { TForm } from "@/hooks/useForm";

import api from "./api";

export async function createUser({ payload }: { payload: { form: TForm } }) {
  const { nome, email, cpf, complemento, cep, cidade, rua, bairro, numero, uf } = payload.form;
  try {
    const { data } = await api.post(`/clientes`, {
      nome: nome.value,
      email: email.value,
      cpf: cpf.value.replace(/\D/g, ""),
      endereco: {
        rua: rua.value,
        bairro: bairro.value,
        cidade: cidade.value,
        uf: uf.value,
        numero: numero.value,
        complemento: complemento.value,
        cep: cep.value.replace(/\D/g, "")
      }
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}
