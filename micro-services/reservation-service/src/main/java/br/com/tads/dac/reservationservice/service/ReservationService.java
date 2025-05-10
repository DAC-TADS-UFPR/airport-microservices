package br.com.tads.dac.reservationservice.service;

import br.com.tads.dac.reservationservice.model.*;
import br.com.tads.dac.reservationservice.model.dto.CreateReservationRequest;
import br.com.tads.dac.reservationservice.model.dto.UpdateReservationRequest;
import br.com.tads.dac.reservationservice.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservaRepository;
    private final HistoryReservationRepository historicoRepository;


    public Reservation criarReserva(CreateReservationRequest request) {

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

        HistoryReservationState historico = new HistoryReservationState(
                null, reserva.getId(), LocalDateTime.now(), ReservationState.CREATED
        );

        historicoRepository.save(historico);

        return reserva;
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
