package br.com.tads.dac.flightservice.mappers;

import java.time.ZoneOffset;

import org.springframework.stereotype.Component;

import br.com.tads.dac.flightservice.models.dto.FlightDTO;
import br.com.tads.dac.flightservice.models.entities.Flight;

@Component
public class FlightMapper {
    
   

    public FlightDTO fromEntity(Flight f, ZoneOffset offset) {
        return FlightDTO.builder()
            .codigo(f.getCodigo())
            .data(f.getData().atOffset(offset))
            .valorPassagem(f.getValorPassagem())
            .quantidadePoltronasTotal(f.getQuantidadePoltronasTotal())
            .quantidadePoltronasOcupadas(f.getQuantidadePoltronasOcupadas())
            .estado(f.getEstado())
            .aeroportoOrigem(f.getAeroportoOrigem())
            .aeroportoDestino(f.getAeroportoDestino())
            .build();
    }


    public Flight toEntity(FlightDTO flightDTO) {
        Flight flight = new Flight();
        flight.setCodigo(flightDTO.getCodigo());
        flight.setEstado(flightDTO.getEstado());
        return flight;
    }
}
