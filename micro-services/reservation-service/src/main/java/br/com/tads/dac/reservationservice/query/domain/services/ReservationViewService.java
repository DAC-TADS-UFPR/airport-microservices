package br.com.tads.dac.reservationservice.query.domain.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.com.tads.dac.reservationservice.query.domain.exceptions.ReservationNotFoundException;
import br.com.tads.dac.reservationservice.query.domain.models.dto.ReservationDTO;
import br.com.tads.dac.reservationservice.query.domain.repositories.ReservationViewRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationViewService {
    private final ReservationViewRepository reservationViewRepository;

    public ReservationDTO getById(String id) {
        return reservationViewRepository.findById(id)
                .map(reservation -> ReservationDTO.builder()
                        .id(reservation.getId())
                        .flightId(reservation.getFlightId())
                        .clientId(reservation.getClientId())
                        .estado(reservation.getEstado())
                        .pricePaid(reservation.getPricePaid())
                        .milesUsed(reservation.getMilesUsed())
                        .origin(reservation.getOrigin())
                        .destiny(reservation.getDestiny())
                        .createdAt(reservation.getCreatedAt())
                        .updatedAt(reservation.getUpdatedAt())
                        .build())
                .orElseThrow(() -> new ReservationNotFoundException());
    }
    
}
