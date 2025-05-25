export interface ReservationFullResponse {
  codigo: string;
  data: string; 
  valor: number;
  milhas_utilizadas: number;
  quantidade_poltronas: number;
  codigo_cliente: string;
  estado: string;
  voo: FlightDetails;
}

export interface FlightDetails {
  codigo: string;
  data: string;
  valor_passagem: number | string; 
  quantidade_poltronas_total: number;
  quantidade_poltronas_ocupadas: number;
  estado: string;
  aeroporto_origem: Airport;
  aeroporto_destino: Airport;
}

export interface Airport {
  codigo: string;
  nome: string;
  cidade: string;
  uf: string;
}
