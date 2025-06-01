package br.com.tads.dac.reservationservice.command.domain.model;

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
@Table(name = "reserva")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long codigo;
    private Long codigoVoo;
    private String codigoCliente;

    @Enumerated(EnumType.STRING)
    private ReservationState estado;

    private BigDecimal valor;
    private Long milhasUtilizadas;
    private Integer quantidadePoltronas;
    
    private String codigoAeroportoOrigem;
    private String codigoAeroportoDestino;

    @CreationTimestamp
    private LocalDateTime criadoEm;
    @UpdateTimestamp
    private LocalDateTime atualizadoEm;
}