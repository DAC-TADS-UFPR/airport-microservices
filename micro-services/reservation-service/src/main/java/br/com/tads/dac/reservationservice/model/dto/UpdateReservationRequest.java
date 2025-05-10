package br.com.tads.dac.reservationservice.model.dto;

import br.com.tads.dac.reservationservice.model.ReservationState;

public record UpdateReservationRequest(
    ReservationState estado
) {}