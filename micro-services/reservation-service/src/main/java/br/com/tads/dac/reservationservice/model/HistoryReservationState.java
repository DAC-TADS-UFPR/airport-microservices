package br.com.tads.dac.reservationservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryReservationState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idReservation;
    private LocalDateTime updatedAt;
    @Enumerated(EnumType.STRING)
    private ReservationState state;
}   