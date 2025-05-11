package br.com.tads.dac.reservationservice.command.infraestructure.mappers;

import org.springframework.stereotype.Component;

import br.com.tads.dac.reservationservice.command.domain.model.Reservation;
import br.com.tads.dac.reservationservice.command.domain.model.dto.ReservationDTO;

@Component
public class ReservationMapper {

    public ReservationDTO toDto(Reservation entity) {
        return ReservationDTO.builder()
            .id(entity.getId())
            .flightId(entity.getFlightId())
            .clientId(entity.getClientId())
            .estado(entity.getEstado())
            .pricePaid(entity.getPricePaid())
            .milesUsed(entity.getMilesUsed())
            .origin(entity.getOrigin())
            .destiny(entity.getDestiny())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }
}