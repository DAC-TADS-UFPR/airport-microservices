package br.com.tads.dac.flightservice.services;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.tads.dac.flightservice.exceptions.ResourceNotFoundException;
import br.com.tads.dac.flightservice.mappers.FlightMapper;
import br.com.tads.dac.flightservice.models.dto.CreateFlightRequest;
import br.com.tads.dac.flightservice.models.dto.FlightDTO;
import br.com.tads.dac.flightservice.models.dto.UpdateStateRequest;
import br.com.tads.dac.flightservice.models.entities.Flight;
import br.com.tads.dac.flightservice.models.entities.FlightState;
import br.com.tads.dac.flightservice.repositories.FlightRepository;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private FlightMapper flightMapper;

    public ResponseEntity<FlightDTO> create(@RequestBody CreateFlightRequest req) {
        LocalDateTime localDate = req.date().toLocalDateTime();

        Flight flight = Flight.builder()
            .date(localDate)                                          
            .price(req.price())                                         
            .totalSeats(req.totalSeats())                                
            .occupiedSeats(req.occupiedSeats())                          
            .airportCodeOrigin(Long.valueOf(req.originAirportCode())) 
            .airportCodeDestination(Long.valueOf(req.destinationAirportCode())) 
            .state(FlightState.CRIADO)                                
            .airlineCode("TADS0001")                                  
            .build();

        FlightDTO dto = flightMapper.fromEntity(flightRepository.save(flight), ZoneOffset.of("-03:00"));
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(dto);
    }

    public FlightDTO getFlightById(String id) {
        Flight f = findEntityById(id);
        return flightMapper.fromEntity(f, ZoneOffset.of("-03:00"));
    }

    public FlightDTO updateFlight(String id, Flight flight) {
        Flight existing = findEntityById(id);
        existing.setState(flight.getState());
        existing.setDate(flight.getDate());
        existing.setPrice(flight.getPrice());
        existing.setAirportCodeOrigin(flight.getAirportCodeOrigin());
        existing.setAirportCodeDestination(flight.getAirportCodeDestination());
        existing.setAirlineCode(flight.getAirlineCode());
        existing.setTotalSeats(flight.getTotalSeats());
        existing.setOccupiedSeats(flight.getOccupiedSeats());
        Flight saved = flightRepository.save(existing);
        return flightMapper.fromEntity(saved, ZoneOffset.of("-03:00"));
    }

    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll()
            .stream()
            .map(f -> flightMapper.fromEntity(f, ZoneOffset.of("-03:00")))
            .collect(Collectors.toList());
    }

    public FlightDTO updateFlightState(String id, UpdateStateRequest req) {
        Flight existing = findEntityById(id);
        existing.setState(req.state());
        Flight saved = flightRepository.save(existing);
        return flightMapper.fromEntity(saved, ZoneOffset.of("-03:00"));
    }

    public void deleteFlight(String id) {
        Flight f = findEntityById(id);
        flightRepository.delete(f);
    }

    private Flight findEntityById(String id) {
        return flightRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(id));
    }
}
