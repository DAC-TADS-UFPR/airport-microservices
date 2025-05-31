package br.com.tads.dac.clienteservice.model.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ClientDTO(
    String codigo, 
    String nome,
    String email,
    String cpf,
    Long saldoMilhas,
    EnderecoDTO endereco
) {
   
} 