package br.com.tads.dac.flightservice.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Builder
public record CreateFlightRequest(

    @JsonFormat(shape = JsonFormat.Shape.STRING) 
    OffsetDateTime date,

    BigDecimal price,

    Integer totalSeats,

    Integer occupiedSeats,

    String originAirportCode,

    String destinationAirportCode

) {}
