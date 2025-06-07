package br.com.tads.dac.flightservice.models.dto;

import br.com.tads.dac.flightservice.models.entities.FlightState;
import lombok.Data;

@Data
public class UpdateReservationStateEvent {
    private Long codigoVoo;
    private FlightState estadoVoo;
}
