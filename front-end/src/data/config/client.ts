import { TForm } from "@/hooks/useForm";
import api, { prepareParams } from "./api";

export async function getCliente({ _, queryKey }: any) {
  const [key, id] = queryKey;
  try {
    const { data } = await api.get(`/clientes/${id}`);
    return data;
  } catch (error: any) {
    throw error?.response?.data?.message || error?.message;
  }
}

export async function buyMiles({ payload }: { payload: { form: TForm } }) {
  const { miles } = payload.form;
  try {
    const clientId = localStorage.getItem("userId");
    const { data } = await api.post(`/clientes/${clientId}/milhas`, {
      quantidade: miles.value,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getMiles({ _, queryKey }: any) {
  const [, clientId] = queryKey;
  try {
    const { data } = await api.get(`/clientes/${clientId}/milhas`);
    return data;
  } catch (error: any) {
    throw error?.response?.data?.message || error?.message;
  }
}