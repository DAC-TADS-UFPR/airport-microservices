package br.com.tads.dac.reservationservice.command.infraestructure.mappers;

import org.springframework.stereotype.Component;

import br.com.tads.dac.reservationservice.command.domain.model.Reservation;
import br.com.tads.dac.reservationservice.command.domain.model.dto.ReservationDTO;

@Component
public class ReservationMapper {

    public ReservationDTO toDto(Reservation entity) {
        return ReservationDTO.builder()
            .codigo(entity.getCodigo())
            .codigoVoo(entity.getCodigoVoo())
            .codigoCliente(entity.getCodigoCliente())
            .estado(entity.getEstado())
            .valor(entity.getValor())
            .milhasUtilizadas(entity.getMilhasUtilizadas())
            .codigoAeroportoOrigem(entity.getCodigoAeroportoOrigem())
            .codigoAeroPortoDestino(entity.getCodigoAeroportoDestino())
            .build();
    }
}
