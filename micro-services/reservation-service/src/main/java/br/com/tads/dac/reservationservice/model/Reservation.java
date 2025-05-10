package br.com.tads.dac.reservationservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String flightId;
    private String clientId;
    private String clientName;

    @Enumerated(EnumType.STRING)
    private ReservationState estado;

    private BigDecimal pricePaid;
    private Long milesUsed;
    
    private String origin;
    private String destiny;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}