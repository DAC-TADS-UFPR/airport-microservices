export interface ReservaState {
  id_reserva?: string;
  estado: ReservaStateEnum;
}

export enum ReservaStateEnum {
    PENDENTE = "PENDENTE",
    CONFIRMADA = "CONFIRMADA",
    CANCELADA = "CANCELADA",
    CHECK_IN = "CHECK-IN",
    CRIADA = "CRIADA",
    EMBARCADA = "EMBARCADA",
}
