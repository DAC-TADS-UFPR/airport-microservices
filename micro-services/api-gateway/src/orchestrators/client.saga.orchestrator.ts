import axios, { AxiosError } from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IClient } from "../models/client/IClient";
import { IAuth } from "../models/user/IAuth";
import { UserType } from "../models/user/UserType";
import { ReservationFullResponse } from "../models/reservation/ReservationFull";

export class ClientSagaOrchestatorator {    
    public constructor() {}
    
    public async createClient(clientData: IClient) {
        var clientId = null;
        try {
            console.log('url', `${SERVICE_CONFIG.CLIENT.url}/`);
            const clientResponse = await axios.post(`${SERVICE_CONFIG.CLIENT.url}/`, clientData);
            clientId = clientResponse.data?.id;
            if(clientResponse.status !== 201) {
                return clientResponse;
            }
            const authRequest:IAuth = new IAuth(clientData.email , clientData.nome , clientId, UserType.CLIENT);
            console.log('auth create request:', authRequest);
            const authResponse = await axios.post(`${SERVICE_CONFIG.AUTH.url}/`, authRequest);
            if(authResponse.status !== 201) {
                await axios.delete(`${SERVICE_CONFIG.CLIENT.url}/${clientId}`);
                return authResponse;
            }  
            return clientResponse;
        } catch (error) {
            if(clientId){
                await axios.delete(`${SERVICE_CONFIG.CLIENT.url}/${clientId}`);
            }
           
            const axiosError = error as AxiosError;
            console.error('Error during client creation:', axiosError.response?.data || axiosError.message);
            return {
                status: axiosError.response?.status || 500,
                data: axiosError.response?.data || { message: "Erro interno" },
            };
            
        }
        
    }

     public async findReservationsByClient(idClient: string): Promise<{ status: number; data: ReservationFullResponse[] | any }> {
    try {
      const reservationsResponse = await axios.get(`${SERVICE_CONFIG.RESERVATION_VIEW.url}/cliente/${idClient}`);
      const reservations = reservationsResponse.data;

      const detailedReservations = await Promise.all(
        reservations.map(async (reserva: any) => {
          try {
            const vooResponse = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}/voo/${reserva.codigoVoo}`);
            const voo = vooResponse.data;

            const [origemResponse, destinoResponse] = await Promise.all([
              axios.get(`${SERVICE_CONFIG.AIRPORTS.url}/${voo.codigoAeroportoOrigem}`),
              axios.get(`${SERVICE_CONFIG.AIRPORTS.url}/${voo.codigoAeroportoDestino}`),
            ]);

            return {
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
                aeroporto_origem: origemResponse.data,
                aeroporto_destino: destinoResponse.data,
              },
            } as ReservationFullResponse;
          } catch (innerError) {
            console.error(`Erro ao buscar dados do voo ou aeroporto para reserva ${reserva.codigo}:`, innerError);
            return null;
          }
        })
      );

      const filteredResults = detailedReservations.filter(r => r !== null);

      return {
        status: 200,
        data: filteredResults,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erro ao buscar reservas do cliente:", axiosError.response?.data || axiosError.message);
      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || { message: "Erro interno ao buscar reservas" },
      };
    }
  }
}