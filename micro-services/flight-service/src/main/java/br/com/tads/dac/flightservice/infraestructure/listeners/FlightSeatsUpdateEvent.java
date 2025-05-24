package br.com.tads.dac.flightservice.infraestructure.listeners;

import lombok.Data;

@Data
public class FlightSeatsUpdateEvent {
    private String codigoVoo;
    private Integer quantidadePoltronas;
}
