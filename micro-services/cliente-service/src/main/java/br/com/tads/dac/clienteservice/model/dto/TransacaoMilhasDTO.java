package br.com.tads.dac.clienteservice.model.dto;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import br.com.tads.dac.clienteservice.model.TipoTransacao;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransacaoMilhasDTO {

    private LocalDateTime data;

    private BigDecimal valorReais;

    private Integer quantidadeMilhas;

    private String descricao;

    private Long codigoReserva;

    private TipoTransacao tipo;
}
