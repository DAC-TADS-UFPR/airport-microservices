package br.com.tads.dac.reservationservice.command.domain.model.dto;


import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;
import lombok.Data;

@Data
public class ReservationMilesUpdateEvent {
    private String codigoCliente;
    private Long codigoReserva;
    private Long milhas;
    private ReservationState estado;
}
