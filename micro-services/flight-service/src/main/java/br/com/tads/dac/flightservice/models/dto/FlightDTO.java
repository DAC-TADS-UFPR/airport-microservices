package br.com.tads.dac.flightservice.models.dto;

import br.com.tads.dac.flightservice.models.entities.Airport;
import br.com.tads.dac.flightservice.models.entities.FlightState;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Builder
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class FlightDTO {
    private String codigo;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private OffsetDateTime data;
    private BigDecimal valorPassagem;
    private int quantidadePoltronasTotal;
    private int quantidadePoltronasOcupadas;
    private FlightState estado;
    private Airport aeroportoOrigem;
    private Airport aeroportoDestino;
}
