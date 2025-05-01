package br.com.tads.dac.flightservice.dto.mappers;

import br.com.tads.dac.flightservice.dto.FlightRequestDTO;
import br.com.tads.dac.flightservice.dto.FlightResponseDTO;
import br.com.tads.dac.flightservice.entities.Flight;

public class FlightMapper {

    public static Flight toEntity(FlightRequestDTO dto) {
        Flight flight = new Flight();
        flight.setDepartureAirport(dto.getDepartureAirport());
        flight.setDestinarionAirport(dto.getDestinarionAirport());
        flight.setTicketPrice(dto.getTicketPrice());
        flight.setTotalNumberOfSeats(dto.getTotalNumberOfSeats());
        flight.setNumberOfSeatsOccupied(dto.getNumberOfSeatsOccupied());
        flight.setFlightState(dto.getFlightState());
        return flight;
    }

    public static FlightResponseDTO toDTO(Flight entity) {
        return new FlightResponseDTO(
            entity.getFlightCode(),
            entity.getDepartureAirport(),
            entity.getDestinarionAirport(),
            entity.getTicketPrice(),
            entity.getTotalNumberOfSeats(),
            entity.getNumberOfSeatsOccupied(),
            entity.getFlightState()
        );
    }
}
