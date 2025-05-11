package br.com.tads.dac.employee_service.models.dto;

import lombok.Builder;

@Builder
public record EmployeeDTO(
    String id,
    String name,
    String email,
    String cpf,
    String phone,
    boolean active
) {}