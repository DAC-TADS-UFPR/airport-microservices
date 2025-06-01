package br.com.tads.dac.reservationservice.command.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "historico_reserva")
public class HistoryReservationState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private Long codigoReserva;
    private LocalDateTime alteradoEm;
    @Enumerated(EnumType.STRING)
    private ReservationState estado;
}   