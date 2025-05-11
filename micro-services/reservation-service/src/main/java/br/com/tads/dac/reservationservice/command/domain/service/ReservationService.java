package br.com.tads.dac.reservationservice.command.domain.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tads.dac.reservationservice.command.domain.model.*;
import br.com.tads.dac.reservationservice.command.domain.model.dto.CreateReservationRequest;
import br.com.tads.dac.reservationservice.command.domain.model.dto.ReservationDTO;
import br.com.tads.dac.reservationservice.command.domain.model.dto.UpdateReservationRequest;
import br.com.tads.dac.reservationservice.command.domain.repository.*;
import br.com.tads.dac.reservationservice.command.infraestructure.mappers.ReservationMapper;
import br.com.tads.dac.reservationservice.config.RabbitMQConfig;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservaRepository;
    private final HistoryReservationRepository historicoRepository;
    private final ReservationMapper reservationMapper;
    private final RabbitTemplate rabbitTemplate;

    public ReservationDTO criarReserva(CreateReservationRequest request) {
        Reservation reserva = Reservation.builder()
                .flightId(request.flightId())
                .clientId(request.clientId())
                .estado(ReservationState.CREATED)
                .pricePaid(request.price())
                .milesUsed(request.miles())
                .origin(request.origin())
                .destiny(request.destiny())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        reservaRepository.save(reserva);

        HistoryReservationState historico = HistoryReservationState.builder()
                .idReservation(reserva.getId())
                .updatedAt(LocalDateTime.now())
                .state(ReservationState.CREATED)
                .build();

        historicoRepository.save(historico);
        
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                reservationMapper.toDto(reserva)
        );

        return reservationMapper.toDto(reserva);
    }

    public Reservation alterarEstado(String codigoReserva,
                                     UpdateReservationRequest request) {
        Reservation reserva = reservaRepository.findById(codigoReserva)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada: " + codigoReserva));

        reserva.setEstado(request.estado());
        reserva.setUpdatedAt(LocalDateTime.now());
        reservaRepository.save(reserva);

        HistoryReservationState historico = new HistoryReservationState(
                null,
                reserva.getId(),
                LocalDateTime.now(),
                request.estado()
        );
        historicoRepository.save(historico);

        return reserva;
    }
}
