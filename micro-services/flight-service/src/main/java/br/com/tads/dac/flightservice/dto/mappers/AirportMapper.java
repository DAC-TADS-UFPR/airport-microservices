package br.com.tads.dac.flightservice.dto.mappers;

import br.com.tads.dac.flightservice.dto.AirportRequestDTO;
import br.com.tads.dac.flightservice.dto.AirportResponseDTO;
import br.com.tads.dac.flightservice.entities.Airport;

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
