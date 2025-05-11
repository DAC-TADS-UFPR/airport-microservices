package br.com.tads.dac.reservationservice.command.domain.model;


public enum ReservationState {
    CREATED("CRIADO"),
    BOARDED("EMBARQUE"),
    CHECK_IN("CHECK-IN");

    private String estado;

    ReservationState(String estado) {
        this.estado = estado;
    }

    public String getEstado() {
        return estado;
    }
}