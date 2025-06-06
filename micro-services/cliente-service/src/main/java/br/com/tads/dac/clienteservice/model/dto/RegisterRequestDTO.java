package br.com.tads.dac.clienteservice.model.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record RegisterRequestDTO(
    @NotBlank(message = "Digite seu nome")
    String nome,
    
    @NotBlank(message = "Digite seu e-mail")
    String email,
    
    @NotBlank(message = "Digite seu CPF")
    String cpf,

    Long saldoMilhas,
    
    @NotNull(message = "Endereço não pode ser nulo")
    EnderecoDTO endereco
) {}
