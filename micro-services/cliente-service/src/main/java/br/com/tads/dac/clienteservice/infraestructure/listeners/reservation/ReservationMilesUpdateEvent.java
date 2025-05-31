package br.com.tads.dac.clienteservice.infraestructure.listeners.reservation;

import lombok.Data;

@Data
public class ReservationMilesUpdateEvent {
    private String codigoCliente;
    private Integer milhas;
    private String codigoReserva;
}
