package br.com.tads.dac.reservationservice.command.domain.model.dto;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;
import lombok.Data;

@Data
public class FlightSeatsUpdateEvent {
    private Long codigoVoo;
    private Integer quantidadePoltronas;
    private ReservationState estado;
}
