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
            clientId = clientResponse.data?.codigo;
            if(clientResponse.status !== 201) {
               
              return clientResponse;
            }
            const authRequest:IAuth = new IAuth(clientData.email , clientData.nome , clientId, UserType.CLIENTE);
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
              const vooResponse = await axios.get(`${SERVICE_CONFIG.FLIGHTS.url}/voo/${reserva.codigo_voo}`);
              const voo = vooResponse.data;

              

              return {
                codigo: reserva.codigo,
                data: reserva.criadoEm,
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