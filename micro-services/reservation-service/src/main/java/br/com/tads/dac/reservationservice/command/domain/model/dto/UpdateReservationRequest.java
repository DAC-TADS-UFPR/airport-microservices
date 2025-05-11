package br.com.tads.dac.reservationservice.command.domain.model.dto;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;

public record UpdateReservationRequest(
    ReservationState estado
) {}