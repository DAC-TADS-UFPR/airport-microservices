import { TForm } from "@/hooks/useForm";
import api from "./api";

export async function createEmployee({ payload }: { payload: TForm }) {
  try {
    const { data } = await api.post(`/funcionarios`, { ...payload });
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
