package br.com.tads.dac.reservationservice.command.domain.model.dto;

import java.math.BigDecimal;



public record CreateReservationRequest (
    String codigoAeroportoDestino,
    String codigoAeroportoOrigem,
    String codigoVoo,
    BigDecimal valor,
    Long milhasUtilizadas,
    String codigoCliente,
    Integer quantidadePoltronas
){}
