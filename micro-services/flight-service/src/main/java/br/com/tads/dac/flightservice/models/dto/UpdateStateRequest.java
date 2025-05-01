package br.com.tads.dac.flightservice.models.dto;

import br.com.tads.dac.flightservice.models.entities.FlightState;
import jakarta.validation.constraints.NotNull;

public record UpdateStateRequest(
    @NotNull(message = "O estado do voo não pode ser vazio")
    FlightState state
) {}
