package br.com.tads.dac.reservationservice.command.domain.model.dto;

import lombok.Builder;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;

@Builder
public record ReservationDTO(
    String id,
    String flightId,
    String clientId,
    ReservationState estado,
    BigDecimal pricePaid,
    Long milesUsed,
    String origin,
    String destiny,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}