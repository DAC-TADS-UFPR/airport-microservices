import { TForm } from "@/hooks/useForm";
import api from "./api";
import { IReserva } from "@/models/reserva.create";
import { ReservationDTO } from "@/models/reserva";
import { ReservaState } from "@/models/reserva.state";


export async function createReservation(payload : IReserva) {
  try {
    const storedId = localStorage.getItem("userId");
    payload.codigo_cliente = storedId || payload.codigo_cliente;
    const { data } = await api.post(`/reservas`, payload);
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getReservation({ queryKey }: any): Promise<ReservationDTO> {
  const [, codigoReserva] = queryKey;
  const { data } = await api.get<ReservationDTO>(`/reservas/${codigoReserva}`);
  return data;
}

export async function getReservationsByClient({ queryKey }: any): Promise<ReservationDTO[]> {
  const [, id] = queryKey;
  const { data } = await api.get<ReservationDTO[]>(`/clientes/${id}/reservas`);
  return data;
}



export async function updateReservatioon({ payload }: { payload: TForm }) {
    const { data } = await api.put(`/reservas/${payload.codigo}`, { ...payload });
    return data;
  
}

export async function updateReservationState(payload: ReservaState) {
    const { data } = await api.patch(`/reservas/${payload.id_reserva}/estado`, { ...payload });
    return data;
}
