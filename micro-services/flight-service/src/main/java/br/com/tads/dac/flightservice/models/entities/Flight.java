package br.com.tads.dac.flightservice.models.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "flight")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String codigo;
    @Enumerated(EnumType.STRING)
    private FlightState estado;
    private LocalDateTime data;
    private String codigoAeroPortoOrigem;
    private String codigoAeroPortoDestino;
    private BigDecimal valorPassagem;

    private Integer quantidadePoltronasTotal;
    private Integer quantidadePoltronasOcupadas;

}
