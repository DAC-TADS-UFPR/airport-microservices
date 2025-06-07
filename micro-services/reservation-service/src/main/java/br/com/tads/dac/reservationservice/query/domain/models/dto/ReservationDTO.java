package br.com.tads.dac.reservationservice.query.domain.models.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReservationDTO {
    private Long codigo;
    private Long codigoVoo;
    private String codigoCliente;
    private ReservationState estado;
    private BigDecimal valor;
    private Long milhasUtilizadas;
    private String codigoAeroportoOrigem;
    private String codigoAeroportoDestino;
    private LocalDateTime criadoEm;
    private LocalDateTime atualizadoEm;
}
