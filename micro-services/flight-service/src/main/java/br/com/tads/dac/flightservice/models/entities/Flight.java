package br.com.tads.dac.flightservice.models.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    @Column(nullable = false)
    private String codigo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FlightState estado;

    @Column(nullable = false)
    private LocalDateTime data;

    @Column(nullable = false)
    @Size(min = 3, max = 3, message = "Codigo deve ter 3 caracteres")
    @NotBlank(message = "Código do aeroporto de origem não pode ser vazio")
    private String codigoAeroPortoOrigem;

    @Column(nullable = false)
    @Size(min = 3, max = 3, message = "Codigo deve ter 3 caracteres")
    @NotBlank(message = "Código do aeroporto de destino não pode ser vazio")
    private String codigoAeroPortoDestino;

    @Column(nullable = false)
    @NotBlank(message = "Valor da passagem não pode ser vazio")
    private BigDecimal valorPassagem;

    @Column(nullable = false)
    private Integer quantidadePoltronasTotal;

    @Column(nullable = false)
    private Integer quantidadePoltronasOcupadas;

}
