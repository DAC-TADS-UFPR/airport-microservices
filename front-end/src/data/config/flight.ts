import { TForm } from "@/hooks/useForm";
import api from "./api";
import { parse, format } from 'date-fns';
import { Flight } from "@/models/flight";
import { FlightState } from "@/models/flight.state";

export async function createFlight({ payload }: { payload: { form: TForm } }) {
  const { data_voo, hora, origem, destino, valor_passagem, poltronas } = payload.form;
  const rawDateTime = `${data_voo.value} ${hora.value}`; // ex: "01/06/2025 14:00"
  const parsedDate = parse(rawDateTime, 'dd/MM/yyyy HH:mm', new Date());
  const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
  try {
   
    const { data } = await api.post(`/voos`, 
      { 
        data: `${formattedDate}`,
        codigo_aeroporto_origem: origem.value,
        codigo_aeroporto_destino: destino.value,
        valor_passagem: valor_passagem.value.replace('.', '').replace(',', '.'),
        quantidade_poltronas_total: poltronas.value,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getFlight({ _, queryKey }: any) : Promise<Flight> {
  const [key, id] = queryKey;
  try {
    const { data } = await api.get(`/voo/${id}`);
    return data;
  } catch (error: any) {
    throw error?.response?.data?.message || error?.message;
  }
}

export async function getFlights({ queryKey }: any) : Promise<Flight[]> {
  const [
    key,
    { dataInicial, dataFinal, data, codigoAeroportoOrigem, codigoAeroportoDestino }
  ] = queryKey;

  try {
    const params = new URLSearchParams();

    if (dataInicial) params.append('inicio', dataInicial);
    if (dataFinal) params.append('fim', dataFinal);
    if (data) params.append('data', data);
    if (codigoAeroportoOrigem) params.append('codigoAeroportoOrigem', codigoAeroportoOrigem);
    if (codigoAeroportoDestino) params.append('codigoAeroportoDestino', codigoAeroportoDestino);

    const url = `/voos?${params.toString()}`;
    const { data: responseData } = await api.get(url);

    return responseData;
  } catch (error: any) {
    throw error?.response?.data?.message || error?.message;
  }
}


export async function getAirports({ _, queryKey }: any) {
  const [key, id] = queryKey;
  try {
    const { data } = await api.get(`/aeroportos`);
    return data;
  } catch (error: any) {
    throw error?.response?.data?.message || error?.message;
  }
}

export async function updateFlight({ payload }: { payload: TForm }) {
  try {
    const { data } = await api.put(`/voos/${payload.codigo}`, { ...payload });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function updateFlightState(payload: FlightState) {
  try {
    const { data } = await api.put(`/voos/${payload.id_voo}`, { ...payload });
    return data;
  } catch (error: any) {
    throw error;
  }
}