package br.com.tads.dac.employee_service.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeDTO {
    private final String codigo;
    private final String nome;
    private final String email;
    private final String cpf;
    private final String telefone;
    private final String tipo = "FUNCIONARIO";
}