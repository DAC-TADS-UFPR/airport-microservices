export interface ReservaState {
  id_reserva?: string;
  estado: ReservaStateEnum;
}

export enum ReservaStateEnum {
    PENDENTE = "PENDENTE",
    CONFIRMADA = "CONFIRMADA",
    CANCELADA = "CANCELADA",
    CANCELADA_VOO = "CANCELADA_VOO",
    CHECK_IN = "CHECK-IN",
    CRIADA = "CRIADA",
    EMBARCADA = "EMBARCADA",
    REALIZADA = "REALIZADA",
    NAO_REALIZADA = "NAO_REALIZADA",
}
