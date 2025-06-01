package br.com.tads.dac.reservationservice.command.infraestructure.listeners;

import lombok.Data;

@Data
public class UpdateReservationStateEvent {
    private Long codigoVoo;
    private FlightState estadoVoo;
}
