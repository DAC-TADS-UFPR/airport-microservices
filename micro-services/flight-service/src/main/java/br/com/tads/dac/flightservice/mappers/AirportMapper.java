package br.com.tads.dac.flightservice.mappers;

import org.springframework.stereotype.Component;

import br.com.tads.dac.flightservice.models.dto.AirportRequestDTO;
import br.com.tads.dac.flightservice.models.dto.AirportResponseDTO;
import br.com.tads.dac.flightservice.models.entities.Airport;

@Component
public class AirportMapper {

    public static Airport toEntity(AirportRequestDTO dto) {
        return new Airport(
            dto.getCodigo(),
            dto.getNome(),
            dto.getCidade(),
            dto.getUf()
        );
    }

    public static AirportResponseDTO toDTO(Airport entity) {
        return new AirportResponseDTO(
            entity.getCodigo(),
            entity.getNome(),
            entity.getCidade(),
            entity.getUf()
        );
    }
}
