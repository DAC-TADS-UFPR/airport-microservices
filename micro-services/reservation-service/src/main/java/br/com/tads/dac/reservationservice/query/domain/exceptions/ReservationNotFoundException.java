package br.com.tads.dac.reservationservice.query.domain.exceptions;

public class ReservationNotFoundException extends RuntimeException {
    public ReservationNotFoundException(String id) {
        super("Reservation not found with id: " + id);
    }
    public ReservationNotFoundException() {
        super("Reservation not found");
    }
    
}
