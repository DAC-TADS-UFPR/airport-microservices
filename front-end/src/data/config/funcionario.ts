import api from "./api";

export async function getCliente({ _, queryKey }: any) {
  const [key, id] = queryKey;
  try {
    const { data } = await api.get(`/client/`);
    return data;
  } catch (error: any) {
    throw error?.response?.data?.message || error?.message;
  }
}
