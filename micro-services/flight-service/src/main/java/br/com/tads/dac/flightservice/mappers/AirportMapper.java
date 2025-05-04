package br.com.tads.dac.flightservice.mappers;

import br.com.tads.dac.flightservice.models.dto.AirportRequestDTO;
import br.com.tads.dac.flightservice.models.dto.AirportResponseDTO;
import br.com.tads.dac.flightservice.models.entities.Airport;

public class AirportMapper {

    public static Airport toEntity(AirportRequestDTO dto) {
        return new Airport(
            dto.getAirportCode(),
            dto.getAirportName(),
            dto.getCity(),
            dto.getUf()
        );
    }

    public static AirportResponseDTO toDTO(Airport entity) {
        return new AirportResponseDTO(
            entity.getAirportCode(),
            entity.getAirportName(),
            entity.getCity(),
            entity.getUf()
        );
    }
}
