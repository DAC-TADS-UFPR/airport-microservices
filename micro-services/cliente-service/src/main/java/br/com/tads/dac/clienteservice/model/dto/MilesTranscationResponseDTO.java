package br.com.tads.dac.clienteservice.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MilesTranscationResponseDTO {
    private String codigo;
    private Long saldoMilhas;
}
