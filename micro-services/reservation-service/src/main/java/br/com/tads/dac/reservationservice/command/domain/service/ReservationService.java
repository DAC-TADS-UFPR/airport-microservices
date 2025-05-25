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
                .estado(ReservationState.CREATED)
                .valor(request.valor())
                .milhasUtilizadas(request.milhasUtilizadas())
                .codigoAeroportoOrigem(request.codigoAeroportoOrigem())
                .codigoAeroportoDestino(request.codigoAeroportoDestino())
                .build();

        reservaRepository.save(reserva);

        HistoryReservationState historico = HistoryReservationState.builder()
                .codigoReserva(reserva.getCodigo())
                .alteradoEm(LocalDateTime.now())
                .estado(ReservationState.CREATED)
                .build();

        historicoRepository.save(historico);
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                reservationMapper.toDto(reserva)
        );

        FlightSeatsUpdateEvent seatEvent = new FlightSeatsUpdateEvent();
        seatEvent.setCodigoVoo(request.codigoVoo());
        seatEvent.setQuantidadePoltronas(request.quantidadePoltronas());

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.FLIGHT_EXCHANGE,
                RabbitMQConfig.FLIGHT_ROUTING_KEY,
                seatEvent
        );

        ReservationMilesUpdateEvent event = new ReservationMilesUpdateEvent();
        event.setCodigoCliente(request.codigoCliente());
        event.setMilhas(request.milhasUtilizadas());

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.CLIENT_EXCHANGE,
                RabbitMQConfig.CLIENT_ROUTING_KEY,
                event
        );

        return reservationMapper.toDto(reserva);
    }

    public ReservationDTO alterarEstado(String codigoReserva, UpdateReservationRequest request) {
        Reservation reserva = reservaRepository.findById(codigoReserva)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada: " + codigoReserva));

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

        return reservationMapper.toDto(reserva);
    }
}
