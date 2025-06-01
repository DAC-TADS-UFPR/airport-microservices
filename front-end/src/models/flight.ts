import { Airport } from "./airport";

export interface Flight {
  codigo: string;
  data: string; 
  valor_passagem: number;
  quantidade_poltronas_total: number;
  quantidade_poltronas_ocupadas: number;
  estado: string;
  aeroporto_origem: Airport;
  aeroporto_destino: Airport;
}