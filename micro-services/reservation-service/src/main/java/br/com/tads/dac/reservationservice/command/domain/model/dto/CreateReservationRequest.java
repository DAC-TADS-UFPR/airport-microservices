package br.com.tads.dac.reservationservice.command.domain.model.dto;

import java.math.BigDecimal;

public record CreateReservationRequest (
    String origin,
    String destiny,
    String flightId,
    BigDecimal price,
    Long miles,
    String clientId
){}
