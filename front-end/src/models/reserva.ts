import { Flight } from "./flight";
import { ReservaStateEnum } from "./reserva.state";

export interface ReservationDTO {
  codigo: string;
  data: string; 
  valor: number;
  milhas_utilizadas: number;
  quantidade_poltronas: number;
  codigo_cliente: number;
  estado: ReservaStateEnum;        
  voo: Flight;
}
