import axios, { AxiosError } from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { ReservationFullResponse } from "../models/reservation/ReservationFull";
import { ClientSagaOrchestatorator } from "./client.saga.orchestrator";

const clientSagaOrchestrator = new ClientSagaOrchestatorator();

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

  createReservation = async (createReservationRequest: any): Promise<{ status: number; data: ReservationFullResponse | any }> => {
    try {
      const flightResponse = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}/voo/${createReservationRequest.codigo_voo}`);
      if (!flightResponse.data) {
        return { status: 404, data: { message: 'Voo não encontrado' } };
      }

      const clientResponse = await clientSagaOrchestrator.findClientById(createReservationRequest.codigo_cliente);
      if (clientResponse.status !== 200) {
        return { status: clientResponse.status, data: clientResponse.data };
      }
      const client = clientResponse.data;
      if (client.saldo_milhas < createReservationRequest.milhas_utilizadas) {
        return { status: 400, data: { erro: 'Saldo de milhas insuficiente' } };
      }

      const responseCreate = await axios.post(`${SERVICE_CONFIG.RESERVATION.url}/`, createReservationRequest);
      const newReservation: ReservationFullResponse = {
        codigo: responseCreate.data.codigo,
        codigo_cliente: responseCreate.data.codigo_cliente,
        valor: responseCreate.data.valor,
        milhas_utilizadas: responseCreate.data.milhas_utilizadas,
        quantidade_poltronas: responseCreate.data.quantidade_poltronas,
        voo: flightResponse.data,
        estado: responseCreate.data.estado,
        data: responseCreate.data.data,
      };

      await new Promise(resolve => setTimeout(resolve, 2000));

      return { status: responseCreate.status, data: newReservation };
    } catch (e: any) {
      console.error("Error creating reservation:", e.response?.data || e.message);
      return { status: e.response?.status || 500, data: { message: e.response?.data || "Erro ao criar reserva" } };
    }
  }
}
