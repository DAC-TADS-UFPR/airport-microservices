package br.com.tads.dac.reservationservice.exceptions;

import br.com.tads.dac.reservationservice.command.domain.model.Reservation;
import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;

public class InvalidStateChangeException extends RuntimeException {
    private static final long serialVersionUID = 1L;


    public InvalidStateChangeException(ReservationState currentState, ReservationState newState, Reservation reservation) {
        super("Não é possível alterar o estado da reserva de " + currentState + " para " + newState + " para a reserva: " + reservation.getCodigo());
    }

}
