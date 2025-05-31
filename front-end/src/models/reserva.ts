export interface AirportDTO {
  codigo: string;
  nome: string;
  cidade: string;
  uf: string;
}

export interface FlightDTO {
  codigo: string;
  data: string; 
  valor_passagem: number;
  quantidade_poltronas_total: number;
  quantidade_poltronas_ocupadas: number;
  estado: string;
  aeroporto_origem: AirportDTO;
  aeroporto_destino: AirportDTO;
}

export interface ReservationDTO {
  codigo: string;
  data: string; 
  valor: number;
  milhas_utilizadas: number;
  quantidade_poltronas: number;
  codigo_cliente: number;
  estado: string;        
  voo: FlightDTO;
}
