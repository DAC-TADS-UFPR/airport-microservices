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
    private String id;

    private FlightState state;
    private LocalDateTime date;
    private Long airportCodeOrigin;
    private Long airportCodeDestination;
    private BigDecimal price;
    private String airlineCode;

    private Integer totalSeats;
    private Integer occupiedSeats;

}
