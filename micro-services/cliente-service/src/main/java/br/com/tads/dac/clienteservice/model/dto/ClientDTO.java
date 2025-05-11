package br.com.tads.dac.clienteservice.model.dto;

public record ClientDTO(
    String id, 
    String name,
    String email,
    String cpf,
    Long saldoMilhas,
    EnderecoDTO endereco
) {
   
} 