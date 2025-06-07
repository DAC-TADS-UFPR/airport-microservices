package br.com.tads.dac.reservationservice.command.domain.model.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;

@Data
@Builder
public class ReservationDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long codigo;
    private Long codigoVoo;
    private String codigoCliente;
    private Integer quantidadePoltronas;
    private ReservationState estado;
    private BigDecimal valor;
    private Long milhasUtilizadas;
    private String codigoAeroportoOrigem;
    private String codigoAeroportoDestino;
}
