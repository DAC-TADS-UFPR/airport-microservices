package br.com.tads.dac.reservationservice.query.domain.models.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;
@Entity
@Table(name = "reservation_view")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationView {

    @Id
    private String id;

    private String flightId;
    private String clientId;

    @Enumerated(EnumType.STRING)
    private ReservationState estado;

    private BigDecimal pricePaid;
    private Long milesUsed;

    private String origin;
    private String destiny;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}