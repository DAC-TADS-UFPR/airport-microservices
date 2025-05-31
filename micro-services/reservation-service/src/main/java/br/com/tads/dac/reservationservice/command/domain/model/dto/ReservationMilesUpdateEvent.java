package br.com.tads.dac.reservationservice.command.domain.model.dto;


import lombok.Data;

@Data
public class ReservationMilesUpdateEvent {
    private String codigoCliente;
    private String codigoReserva;
    private Long milhas;
}
