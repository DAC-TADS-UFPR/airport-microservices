package br.com.tads.dac.flightservice.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.tads.dac.flightservice.exceptions.ResourceNotFoundException;
import br.com.tads.dac.flightservice.mappers.FlightMapper;
import br.com.tads.dac.flightservice.models.dto.CreateFlightRequest;
import br.com.tads.dac.flightservice.models.dto.FlightDTO;
import br.com.tads.dac.flightservice.models.dto.UpdateStateRequest;
import br.com.tads.dac.flightservice.models.entities.Airport;
import br.com.tads.dac.flightservice.models.entities.Flight;
import br.com.tads.dac.flightservice.models.entities.FlightState;
import br.com.tads.dac.flightservice.repositories.FlightRepository;
import jakarta.transaction.Transactional;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private FlightMapper flightMapper;

    @Transactional(rollbackOn = Exception.class)
    public FlightDTO create(CreateFlightRequest req) {
        LocalDateTime localDate = req.getData().toLocalDateTime();

        Flight flight = Flight.builder()
            .data(localDate)                                          
            .valorPassagem(req.getValorPassagem())                                         
            .quantidadePoltronasTotal(Objects.nonNull(req.getQuantidadePoltronasTotal()) ? req.getQuantidadePoltronasTotal() : 0)                            
            .quantidadePoltronasOcupadas(Objects.nonNull(req.getQuantidadePoltronasOcupadas()) ? req.getQuantidadePoltronasOcupadas() : 0)                      
            .aeroportoOrigem(new Airport(req.getCodigoAeroportoOrigem())) 
            .aeroportoDestino(new Airport(req.getCodigoAeroportoDestino()))
            .estado(FlightState.CRIADO)                                
            .build();

        Flight savedFlight = flightRepository.save(flight);    
        return flightMapper.fromEntity(savedFlight, ZoneOffset.of("-03:00"));
    }

    public FlightDTO getFlightById(String id) {
        Flight f = findEntityById(id);
        return flightMapper.fromEntity(f, ZoneOffset.of("-03:00"));
    }

    public List<FlightDTO> getFlights(LocalDate dataInicial, LocalDate dataFinal , LocalDate data , String codigoAeroportoOrigem, String codigoAeroportoDestino) {
        if (data != null) {
            LocalDateTime dataHora = data.atStartOfDay();
            List<Flight> flights = flightRepository.findAllByDataAndAeroportoOrigem_CodigoAndAeroportoDestino_Codigo(dataHora, codigoAeroportoOrigem , codigoAeroportoDestino);
            
            return flights.stream()
                .map(f -> flightMapper.fromEntity(f, ZoneOffset.of("-03:00")))
                .collect(Collectors.toList());
        }

        if (codigoAeroportoOrigem != null && codigoAeroportoDestino != null) {
            List<Flight> flights = flightRepository.findAllByAeroportoOrigem_CodigoAndAeroportoDestino_Codigo(codigoAeroportoOrigem , codigoAeroportoDestino);
            
            return flights.stream()
                .map(f -> flightMapper.fromEntity(f, ZoneOffset.of("-03:00")))
                .collect(Collectors.toList());
        }

        if (dataInicial == null || dataFinal == null) {
            throw new IllegalArgumentException("Data inicial e data final são obrigatórias.");
        }

        List<Flight> flights = flightRepository.findAllByDataBetween(dataInicial.atStartOfDay(), dataFinal.atTime(23, 59, 59));
        return flights.stream()
            .map(f -> flightMapper.fromEntity(f, ZoneOffset.of("-03:00")))
            .collect(Collectors.toList());        
    }

    public FlightDTO updateFlight(String id, Flight flight) {
        Flight existing = findEntityById(id);
        
        existing.setEstado(flight.getEstado());
        existing.setData(flight.getData());
        existing.setValorPassagem(flight.getValorPassagem());
        existing.setQuantidadePoltronasTotal(flight.getQuantidadePoltronasTotal());
        existing.setQuantidadePoltronasOcupadas(flight.getQuantidadePoltronasOcupadas());
        existing.setAeroportoOrigem(flight.getAeroportoOrigem());
        existing.setAeroportoDestino(flight.getAeroportoDestino());

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
