package br.com.tads.dac.reservationservice.command.domain.model.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;

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
