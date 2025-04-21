package br.com.tads.dac.reservasservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoEstadoReserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoReserva;

    private LocalDateTime dataHora;

    private String estadoOrigem;

    private String estadoDestino;
}