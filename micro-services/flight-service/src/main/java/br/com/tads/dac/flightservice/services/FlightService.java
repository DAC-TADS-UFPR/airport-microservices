package br.com.tads.dac.flightservice.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.tads.dac.flightservice.exceptions.ResourceNotFoundException;
import br.com.tads.dac.flightservice.infraestructure.config.RabbitMQConfig;
import br.com.tads.dac.flightservice.mappers.FlightMapper;
import br.com.tads.dac.flightservice.models.dto.CreateFlightRequest;
import br.com.tads.dac.flightservice.models.dto.FlightDTO;
import br.com.tads.dac.flightservice.models.dto.ReservationState;
import br.com.tads.dac.flightservice.models.dto.UpdateReservationStateEvent;
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
    private AirportService airportService;

    @Autowired
    private FlightMapper flightMapper;

    @Autowired    
    private  RabbitTemplate rabbitTemplate;

    @Transactional(rollbackOn = Exception.class)
    public FlightDTO create(CreateFlightRequest req) {
        LocalDateTime localDate = req.getData()
            .toInstant()
            .atZone(ZoneId.of("America/Sao_Paulo"))
            .toLocalDateTime(); 
        Airport airportOrigem = airportService.getByAirportCode(req.getCodigoAeroportoOrigem())
            .orElseThrow(() -> new ResourceNotFoundException("Aeroporto de origem não encontrado: " + req.getCodigoAeroportoOrigem()));
        Airport airportDestino = airportService.getByAirportCode(req.getCodigoAeroportoDestino())
            .orElseThrow(() -> new ResourceNotFoundException("Aeroporto de destino não encontrado: " + req.getCodigoAeroportoDestino()));
        
        Flight flight = Flight.builder()
            .data(localDate)                                          
            .valorPassagem(req.getValorPassagem())                                         
            .quantidadePoltronasTotal(Objects.nonNull(req.getQuantidadePoltronasTotal()) ? req.getQuantidadePoltronasTotal() : 0)                            
            .quantidadePoltronasOcupadas(Objects.nonNull(req.getQuantidadePoltronasOcupadas()) ? req.getQuantidadePoltronasOcupadas() : 0)                      
            .aeroportoOrigem(airportOrigem) 
            .aeroportoDestino(airportDestino)
            .estado(FlightState.CONFIRMADO)                                
            .build();

        Flight savedFlight = flightRepository.save(flight);    
        return flightMapper.fromEntity(savedFlight);
    }

    public FlightDTO getFlightById(Long id) {
        Flight f = findEntityById(id);
        return flightMapper.fromEntity(f);
    }

    public List<FlightDTO> getFlights(LocalDate dataInicial, LocalDate dataFinal , LocalDateTime data , String codigoAeroportoOrigem, String codigoAeroportoDestino) {
         List<Flight> flights = new ArrayList<>();
        if (data != null) {
            if (codigoAeroportoOrigem != null && codigoAeroportoDestino != null) {
                flights = flightRepository.findAllByDataAfterAndAeroportoOrigem_CodigoAndAeroportoDestino_Codigo(data, codigoAeroportoOrigem , codigoAeroportoDestino);
            }else{
                flights = flightRepository.findAllByDataAfter(data);
            }
            
            return flights.stream()
                .map(f -> flightMapper.fromEntity(f))
                .sorted((f1, f2) -> f1.getData().compareTo(f2.getData()))
                .collect(Collectors.toList());
        }

        if (codigoAeroportoOrigem != null && codigoAeroportoDestino != null) {
            flights = flightRepository.findAllByAeroportoOrigem_CodigoAndAeroportoDestino_Codigo(codigoAeroportoOrigem , codigoAeroportoDestino);
            
            return flights.stream()
                .map(f -> flightMapper.fromEntity(f))
                .sorted((f1, f2) -> f1.getData().compareTo(f2.getData()))
                .collect(Collectors.toList());
        }

        if (dataInicial == null || dataFinal == null) {
            throw new IllegalArgumentException("Data inicial e data final são obrigatórias.");
        }

        flights = flightRepository.findAllByDataBetween(dataInicial.atStartOfDay(), dataFinal.atTime(23, 59, 59));
        return flights.stream()
            .map(f -> flightMapper.fromEntity(f))
            .sorted((f1, f2) -> f1.getData().compareTo(f2.getData()))
            .collect(Collectors.toList());        
    }

    public FlightDTO updateFlight(Long id, Flight flight) {
        Flight existing = findEntityById(id);
        
        existing.setEstado(flight.getEstado());
        existing.setData(flight.getData());
        existing.setValorPassagem(flight.getValorPassagem());
        existing.setQuantidadePoltronasTotal(flight.getQuantidadePoltronasTotal());
        existing.setQuantidadePoltronasOcupadas(flight.getQuantidadePoltronasOcupadas());
        existing.setAeroportoOrigem(flight.getAeroportoOrigem());
        existing.setAeroportoDestino(flight.getAeroportoDestino());

        Flight saved = flightRepository.save(existing);
        return flightMapper.fromEntity(saved);
    }

    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll()
            .stream()
            .map(f -> flightMapper.fromEntity(f))
            .collect(Collectors.toList());
    }

    public FlightDTO updateFlightState(Long id, UpdateStateRequest req) {
        Flight existing = findEntityById(id);
        existing.setEstado(req.estado());
        Flight saved = flightRepository.save(existing);
        
        if(req.estado() == FlightState.CANCELADO) 
            sendStateReservationEvent(saved.getCodigo() , req.estado());
        else if(req.estado() == FlightState.REALIZADO)
            sendStateReservationEvent(saved.getCodigo() , req.estado());    

        return flightMapper.fromEntity(saved);
    }

    public void sendStateReservationEvent(Long codigoVoo , FlightState estado) {
        UpdateReservationStateEvent event = new UpdateReservationStateEvent();
        event.setCodigoVoo(codigoVoo);
        event.setEstadoVoo(estado);
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.RESERVATION_EXCHANGE,
                RabbitMQConfig.RESERVATION_UPDATE_STATE_ROUTING_KEY,
                event
        );
    }

    public void deleteFlight(Long id) {
        Flight f = findEntityById(id);
        flightRepository.delete(f);
    }

    private Flight findEntityById(Long id) {
        return flightRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException(id));
    }
}
