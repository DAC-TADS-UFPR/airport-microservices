import { TForm } from "@/hooks/useForm";
import api from "./api";

export async function createEmployee({ payload }:any) {
  try {
    var { nome, cpf, email, telefone , senha} = payload;
    cpf = cpf.replace(/\D/g, '');
    telefone = telefone.replace(/\D/g, '');
    const { data } = await api.post(`/funcionarios`, { nome, cpf, email, telefone , senha });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getEmployee({ _, queryKey }: any) {
  const [key, id] = queryKey;
  try {
    const { data } = await api.get(`/funcionarios`);
    return data;
  } catch (error: any) {
    throw error?.response?.data?.message || error?.message;
  }
}

export async function updateEmployee({ payload }: { payload: TForm }) {
  try {
    const { data } = await api.put(`/funcionarios/${payload.codigo}`, { ...payload });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteEmployee(cpf: string) {
  try {
    const { data } = await api.delete(`/funcionarios/${cpf}`);
    return data;
  } catch (error: any) {
    throw error;
  }
}