package br.com.tads.dac.flightservice.infraestructure.listeners;

import lombok.Data;

@Data
public class FlightSeatsUpdateEvent {
    private Long codigoVoo;
    private Integer quantidadePoltronas;
    private ReservationState estado;
}
