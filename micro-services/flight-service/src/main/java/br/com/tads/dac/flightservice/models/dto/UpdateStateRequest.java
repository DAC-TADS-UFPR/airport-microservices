package br.com.tads.dac.flightservice.models.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import br.com.tads.dac.flightservice.models.entities.FlightState;
import jakarta.validation.constraints.NotNull;


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record UpdateStateRequest(
    @NotNull(message = "O estado do voo não pode ser vazio")
    FlightState estado
) {}
