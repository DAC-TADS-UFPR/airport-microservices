package br.com.tads.dac.flightservice.models.entities;

public enum FlightState {
    CANCELADO("CANCELADO"),
    ATRASADO("ATRASADO"),
    REALIZADO("REALIZADO"),
    CONFIRMADO("CONFIRMADO");

    private String estado;

    FlightState(String estado) {
        this.estado = estado;
    }

    public String getEstado() {
        return estado;
    }

}
