export interface IReserva {
  codigo_voo: string;
  quantidade_poltronas: number;
  milhas_utilizadas: number;
  valor: number;
  codigo_aeroporto_origem: string;
  codigo_aeroporto_destino: string;
  codigo_cliente?: string;
  codigo_reserva?: string;
}