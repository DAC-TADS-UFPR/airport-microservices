import axios, { AxiosError } from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { ReservationFullResponse } from "../models/reservation/ReservationFull";

export class ReservationSagaOrchestatorator {
  public constructor() {}

  public async findReservation(idReserva: string) : Promise<{ status: number; data: ReservationFullResponse | any }>{
    try {
      const reservaResponse = await axios.get(`${SERVICE_CONFIG.RESERVATION_VIEW.url}/${idReserva}`);
      const reserva = reservaResponse.data;

      const vooResponse = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}/voo/${reserva.codigo_voo}`);
      const voo = vooResponse.data;

     

      const respostaFinal = {
        codigo: reserva.codigo,
        data: reserva.criado_em, 
        valor: reserva.valor,
        milhas_utilizadas: reserva.milhas_utilizadas,
        quantidade_poltronas: 1,
        codigo_cliente: reserva.codigo_cliente,
        estado: reserva.estado,
        voo: {
          codigo: voo.codigo,
          data: voo.data,
          valor_passagem: voo.valor_passagem,
          quantidade_poltronas_total: voo.quantidade_poltronas_total,
          quantidade_poltronas_ocupadas: voo.quantidade_poltronas_ocupadas,
          estado: voo.estado,
          aeroporto_origem: voo.aeroporto_origem,
          aeroporto_destino: voo.aeroporto_destino,
        },
      };

      return {
        status: 200,
        data: respostaFinal,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erro ao montar dados da reserva:", axiosError.response?.data || axiosError.message);

      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || { message: "Erro interno ao montar dados da reserva" },
      };
    }
  }
}
