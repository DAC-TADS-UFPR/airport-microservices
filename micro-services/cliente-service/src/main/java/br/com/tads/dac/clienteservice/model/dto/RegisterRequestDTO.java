package br.com.tads.dac.clienteservice.model.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDTO(
    @NotBlank(message = "Digite seu nome")
    String name,
    
    @NotBlank(message = "Digite seu e-mail")
    String email,
    
    @NotBlank(message = "Digite seu CPF")
    String cpf,
    
    @NotBlank(message = "Digite seu CEP")
    String cep,
    
    @NotBlank(message = "Digite seu endereço")
    String street,
    
    @NotBlank(message = "Digite o número")
    String number,
    
    String complement,
    
    @NotBlank(message = "Digite o bairro")
    String neighborhood,
    
    @NotBlank(message = "Digite a cidade")
    String city,
    
    @NotBlank(message = "Digite o estado")
    String state
) {}
