package br.com.tads.dac.clienteservice.model.dto;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteTransacoesResponseDTO {

    private String codigo;

    private Integer saldoMilhas;

    private List<TransacaoMilhasDTO> transacoes;
}
