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
