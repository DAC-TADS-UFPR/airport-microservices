package br.com.tads.dac.reservationservice.query.domain.models.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;
import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class ReservationDTO {
    private String id;
    private String flightId;
    private String clientId;
    private ReservationState estado;
    private BigDecimal pricePaid;
    private Long milesUsed;
    private String origin;
    private String destiny;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
