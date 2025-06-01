package br.com.tads.dac.clienteservice.infraestructure.listeners.reservation;

public enum ReservationState {
    CRIADA("CRIADA"),
    EMBARCADA("EMBARCADA"),
    CHECK_IN("CHECK-IN"),
    CANCELADA("CANCELADO"),
    REALIZADA("REALIZADA"),
    NAO_REALIZADA("NÃO REALIZADA"),
    CANCELADA_VOO("CANCELADA VOO");

    private String estado;

    ReservationState(String estado) {
        this.estado = estado;
    }

    public String getEstado() {
        return estado;
    }
}