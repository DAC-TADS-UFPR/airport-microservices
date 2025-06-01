package br.com.tads.dac.reservationservice.command.domain.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tads.dac.reservationservice.command.domain.model.*;
import br.com.tads.dac.reservationservice.command.domain.model.dto.CreateReservationRequest;
import br.com.tads.dac.reservationservice.command.domain.model.dto.FlightSeatsUpdateEvent;
import br.com.tads.dac.reservationservice.command.domain.model.dto.ReservationDTO;
import br.com.tads.dac.reservationservice.command.domain.model.dto.ReservationMilesUpdateEvent;
import br.com.tads.dac.reservationservice.command.domain.model.dto.UpdateReservationRequest;
import br.com.tads.dac.reservationservice.command.domain.repository.*;
import br.com.tads.dac.reservationservice.command.infraestructure.mappers.ReservationMapper;
import br.com.tads.dac.reservationservice.config.RabbitMQConfig;
import br.com.tads.dac.reservationservice.exceptions.InvalidStateChangeException;

import java.time.LocalDateTime;

@Service
public class ReservationService {

    @Autowired    
    private  ReservationRepository reservaRepository;
    @Autowired    
    private  HistoryReservationRepository historicoRepository;
    @Autowired    
    private  ReservationMapper reservationMapper;
    @Autowired    
    private  RabbitTemplate rabbitTemplate;

    @Transactional
    public ReservationDTO criarReserva(CreateReservationRequest request) {
        Reservation reserva = Reservation.builder()
                .codigoVoo(request.codigoVoo())
                .codigoCliente(request.codigoCliente())
                .estado(ReservationState.CRIADA)
                .valor(request.valor())
                .milhasUtilizadas(request.milhasUtilizadas())
                .quantidadePoltronas(request.quantidadePoltronas())
                .codigoAeroportoOrigem(request.codigoAeroportoOrigem())
                .codigoAeroportoDestino(request.codigoAeroportoDestino())
                .build();

        reservaRepository.save(reserva);

        HistoryReservationState historico = HistoryReservationState.builder()
                .codigoReserva(reserva.getCodigo())
                .alteradoEm(LocalDateTime.now())
                .estado(ReservationState.CRIADA)
                .build();

        historicoRepository.save(historico);
        
        sendReservationUpdateEvent(reservationMapper.toDto(reserva));
        sendSeatsUpdateEvent(request.codigoVoo(), request.quantidadePoltronas(), reserva.getEstado());
        sendMilesUpdateEvent(request.codigoCliente(), request.milhasUtilizadas(), reserva.getCodigo(), reserva.getEstado());

        return reservationMapper.toDto(reserva);
    }

    public ReservationDTO alterarEstado(Long codigoReserva, UpdateReservationRequest request) {
        Reservation reserva = reservaRepository.findById(codigoReserva)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada: " + codigoReserva));
        
        validateReservationState(request.estado(), reserva.getEstado(), reserva);

        reserva.setEstado(request.estado());
        reserva.setAtualizadoEm(LocalDateTime.now());
        reservaRepository.save(reserva);

        HistoryReservationState historico = new HistoryReservationState(
                null,
                reserva.getCodigo(),
                LocalDateTime.now(),
                request.estado()
        );
        historicoRepository.save(historico);

        sendReservationUpdateEvent(reservationMapper.toDto(reserva));

        if (request.estado() == ReservationState.CANCELADA || request.estado() == ReservationState.CANCELADA_VOO) {
            sendSeatsUpdateEvent(reserva.getCodigoVoo(), reserva.getQuantidadePoltronas(), reserva.getEstado());
            sendMilesUpdateEvent(reserva.getCodigoCliente(), reserva.getMilhasUtilizadas(), reserva.getCodigo(), reserva.getEstado());
        } 

        return reservationMapper.toDto(reserva);
    }

    public void sendMilesUpdateEvent(String codigoCliente, Long milhas, Long codigoReserva, ReservationState estado) {
        ReservationMilesUpdateEvent event = new ReservationMilesUpdateEvent();
        event.setCodigoCliente(codigoCliente);
        event.setMilhas(milhas);
        event.setCodigoReserva(codigoReserva);
        event.setEstado(estado);

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.CLIENT_EXCHANGE,
                RabbitMQConfig.CLIENT_ROUTING_KEY,
                event
        );
    }

    public void sendSeatsUpdateEvent(Long codigoVoo, Integer quantidadePoltronas, ReservationState estado) {
        FlightSeatsUpdateEvent event = new FlightSeatsUpdateEvent();
        event.setCodigoVoo(codigoVoo);
        event.setQuantidadePoltronas(quantidadePoltronas);
        event.setEstado(estado);

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.FLIGHT_EXCHANGE,
                RabbitMQConfig.FLIGHT_ROUTING_KEY,
                event
        );
    }

    public void sendReservationUpdateEvent(ReservationDTO reserva) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                reserva
        );
    }

    public void validateReservationState(ReservationState newState , ReservationState currentState , Reservation reserva) {
        if (newState == null || currentState == null) {
            throw new IllegalArgumentException("Estado da reserva não pode ser nulo");
        }

        if (newState == ReservationState.EMBARCADA && currentState != ReservationState.CHECK_IN) {
            throw new InvalidStateChangeException(currentState, newState, reserva);
        }
    }
}
