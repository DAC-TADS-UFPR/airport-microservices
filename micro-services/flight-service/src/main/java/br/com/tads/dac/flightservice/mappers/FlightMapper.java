package br.com.tads.dac.flightservice.mappers;

import java.time.ZoneOffset;

import org.springframework.stereotype.Component;

import br.com.tads.dac.flightservice.models.dto.FlightDTO;
import br.com.tads.dac.flightservice.models.entities.Flight;

@Component
public class FlightMapper {
    
   

    public FlightDTO fromEntity(Flight f, ZoneOffset offset) {
        return FlightDTO.builder()
            .code(f.getAirlineCode())
            .date(f.getDate().atOffset(offset))
            .price(f.getPrice())
            .totalSeats(f.getTotalSeats())
            .occupiedSeats(f.getOccupiedSeats())
            .state(f.getState())
            .originAirportCode(f.getAirportCodeOrigin().toString())
            .destinationAirportCode(f.getAirportCodeDestination().toString())
            .build();
    }


    public Flight toEntity(FlightDTO flightDTO) {
        Flight flight = new Flight();
        flight.setId(flightDTO.code());
        flight.setState(flightDTO.state());
        return flight;
    }
}
