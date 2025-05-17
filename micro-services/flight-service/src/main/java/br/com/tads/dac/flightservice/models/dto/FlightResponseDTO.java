package br.com.tads.dac.flightservice.models.dto;

import br.com.tads.dac.flightservice.models.entities.FlightState;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record FlightResponseDTO(

    String code,

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    OffsetDateTime date,

    BigDecimal price,

    int totalSeats,

    int occupiedSeats,

    FlightState state,

    AirportResponseDTO originAirport,

    AirportResponseDTO destinationAirport

) {}
