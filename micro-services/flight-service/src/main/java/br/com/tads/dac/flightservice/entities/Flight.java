package br.com.tads.dac.flightservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "flight")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String flightCode;

    @Column(nullable = false)
    private String departureAirport;

    @Column(nullable = false)
    private String destinarionAirport;

    @Column(nullable = false)
    private Double ticketPrice;

    @Column(nullable = false)
    private int totalNumberOfSeats;

    @Column(nullable = false)
    private int numberOfSeatsOccupied;

    @Column(nullable = false)
    private FlightState flightState;

}
