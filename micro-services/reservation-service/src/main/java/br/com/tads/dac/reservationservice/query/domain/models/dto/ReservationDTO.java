package br.com.tads.dac.reservationservice.query.domain.models.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;
import lombok.Builder;

@Builder
public record ReservationDTO (
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
) {
    
}
