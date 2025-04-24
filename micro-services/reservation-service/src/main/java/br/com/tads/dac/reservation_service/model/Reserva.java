package br.com.tads.dac.reservasservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {

    @Id
    private String codigo; // ex: ABC123

    private String codigoVoo;

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "estado_id")
    private EstadoReserva estado;

    private Double valorGasto;
    private Integer milhasGastas;
    private String origem;
    private String destino;
}