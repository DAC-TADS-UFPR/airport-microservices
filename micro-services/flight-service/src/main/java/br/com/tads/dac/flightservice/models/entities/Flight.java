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

    @Column(nullable = false)
    private LocalDateTime data;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FlightState estado;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(
        name = "codigo_aero_porto_origem",       
        referencedColumnName = "codigo",     
        nullable = false
    )
    private Airport aeroportoOrigem;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(
        name = "codigo_aero_porto_destino", 
        referencedColumnName = "codigo", 
        nullable = false
    )
    private Airport aeroportoDestino;


    @Column(nullable = false)
    private BigDecimal valorPassagem;

    @Column(nullable = false)
    private int quantidadePoltronasTotal;

    @Column(nullable = false)
    private int quantidadePoltronasOcupadas;

}
