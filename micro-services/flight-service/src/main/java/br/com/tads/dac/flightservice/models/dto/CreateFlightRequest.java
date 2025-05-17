package br.com.tads.dac.flightservice.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CreateFlightRequest{
    @JsonFormat(shape = JsonFormat.Shape.STRING) 
    private OffsetDateTime data;
    private BigDecimal valorPassagem;
    private Integer quantidadePoltronasTotal;
    private Integer quantidadePoltronasOcupadas;
    private String codigoAeroportoOrigem;
    private String codigoAeroportoDestino;
}
