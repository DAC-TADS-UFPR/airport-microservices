package br.com.tads.dac.reservationservice.command.domain.model.dto;

import lombok.Data;

@Data
public class FlightSeatsUpdateEvent {
    private String codigoVoo;
    private Integer quantidadePoltronas;
}
