package br.com.tads.dac.clienteservice.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClientUpdateDTO (
        @NotBlank(message = "Nome é obrigatório")
        String name,

        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        @NotBlank(message = "Endereco é obrigatório")
        EnderecoDTO endereco
) {

}