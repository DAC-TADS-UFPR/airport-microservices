package br.com.tads.dac.flightservice.services;

import java.time.LocalDate;
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

    public FlightDTO create(@RequestBody CreateFlightRequest req) {
        LocalDateTime localDate = req.getData().toLocalDateTime();

        Flight flight = Flight.builder()
            .data(localDate)                                          
            .valorPassagem(req.getValorPassagem())                                         
            .quantidadePoltronasTotal(req.getQuantidadePoltronasTotal())                                
            .quantidadePoltronasOcupadas(req.getQuantidadePoltronasOcupadas())                          
            .codigoAeroPortoOrigem(req.getCodigoAeroportoOrigem()) 
            .codigoAeroPortoDestino(req.getCodigoAeroportoDestino())
            .estado(FlightState.CRIADO)                                
            .build();

        FlightDTO dto = flightMapper.fromEntity(flightRepository.save(flight), ZoneOffset.of("-03:00"));
        return dto;
    }

    public FlightDTO getFlightById(String id) {
        Flight f = findEntityById(id);
        return flightMapper.fromEntity(f, ZoneOffset.of("-03:00"));
    }

    public List<FlightDTO> getFlights(LocalDate dataInicial, LocalDate dataFinal) {
        List<Flight> flights = flightRepository.findAllByDataBetween(dataInicial.atStartOfDay(), dataFinal.atTime(23, 59, 59));
        return flights.stream()
            .map(f -> flightMapper.fromEntity(f, ZoneOffset.of("-03:00")))
            .collect(Collectors.toList());        
    }

    public FlightDTO updateFlight(String id, Flight flight) {
        Flight existing = findEntityById(id);
        
        // Ajuste para usar os setters do seu Entity em português
        existing.setEstado(flight.getEstado());
        existing.setData(flight.getData());
        existing.setValorPassagem(flight.getValorPassagem());
        existing.setQuantidadePoltronasTotal(flight.getQuantidadePoltronasTotal());
        existing.setQuantidadePoltronasOcupadas(flight.getQuantidadePoltronasOcupadas());
        existing.setCodigoAeroPortoOrigem(flight.getCodigoAeroPortoOrigem());
        existing.setCodigoAeroPortoDestino(flight.getCodigoAeroPortoDestino());
        
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
        existing.setEstado(req.estado());
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
