package br.com.tads.dac.employee_service.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeCreateDTO(
        @NotBlank(message = "Nome é obrigatório")
        @NotNull(message = "Nome é obrigatório")
        String nome,

        @NotBlank(message = "E-mail é obrigatório")
        @NotNull(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        @NotBlank(message = "CPF é obrigatório")
        @NotNull(message = "CPF é obrigatório")
        String cpf,

        @NotBlank(message = "Telefone é obrigatório")
        @NotNull(message = "Telefone é obrigatório")
        String telefone
) {
}
