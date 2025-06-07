import { Flight } from "./flight";

export interface FlightsResponse {
  voos: Flight[];
  inicio: string;
  fim: string;
  origem: string;
  destino: string;
}