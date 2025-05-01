package br.com.tads.dac.flightservice.dto;

import br.com.tads.dac.flightservice.entities.FlightState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightRequestDTO {

    private String departureAirport;
    private String destinarionAirport;
    private Double ticketPrice;
    private int totalNumberOfSeats;
    private int numberOfSeatsOccupied;
    private FlightState flightState;
}
