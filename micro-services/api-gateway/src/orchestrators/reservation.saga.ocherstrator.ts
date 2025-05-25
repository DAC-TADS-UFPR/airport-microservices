import axios, { AxiosError } from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { ReservationFullResponse } from "../models/reservation/ReservationFull";

export class ReservationSagaOrchestatorator {
  public constructor() {}

  public async findReservation(idReserva: string) : Promise<{ status: number; data: ReservationFullResponse | any }>{
    try {
      const reservaResponse = await axios.get(`${SERVICE_CONFIG.RESERVATION_VIEW.url}/${idReserva}`);
      const reserva = reservaResponse.data;

      const vooResponse = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}/voos/${reserva.codigoVoo}`);
      const voo = vooResponse.data;

      const [origemResponse, destinoResponse] = await Promise.all([
        axios.get(`${SERVICE_CONFIG.AIRPORTS.url}/${voo.codigoAeroportoOrigem}`),
        axios.get(`${SERVICE_CONFIG.AIRPORTS.url}/${voo.codigoAeroportoDestino}`),
      ]);

      const aeroportoOrigem = origemResponse.data;
      const aeroportoDestino = destinoResponse.data;

      const respostaFinal = {
        codigo: reserva.codigo,
        data: reserva.criadoEm, 
        valor: reserva.valor,
        milhas_utilizadas: reserva.milhasUtilizadas,
        quantidade_poltronas: 1,
        codigo_cliente: reserva.codigoCliente,
        estado: reserva.estado,
        voo: {
          codigo: voo.codigo,
          data: voo.data,
          valor_passagem: voo.valorPassagem,
          quantidade_poltronas_total: voo.quantidadePoltronasTotal,
          quantidade_poltronas_ocupadas: voo.quantidadePoltronasOcupadas,
          estado: voo.estado,
          aeroporto_origem: aeroportoOrigem,
          aeroporto_destino: aeroportoDestino,
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
