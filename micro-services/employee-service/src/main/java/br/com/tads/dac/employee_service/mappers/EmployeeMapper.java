package br.com.tads.dac.employee_service.mappers;

import org.springframework.stereotype.Component;
import br.com.tads.dac.employee_service.models.entities.Employee;
import br.com.tads.dac.employee_service.models.dto.EmployeeDTO;
import br.com.tads.dac.employee_service.models.dto.EmployeeCreateDTO;

@Component
public class EmployeeMapper {

    public Employee toEntity(EmployeeCreateDTO dto) {
        return new Employee(dto);
    }

    public EmployeeDTO toDto(Employee entity) {
        return EmployeeDTO.builder()
            .codigo(entity.getCpf())
            .nome(entity.getNome())
            .email(entity.getEmail())
            .cpf(entity.getCpf())
            .telefone(entity.getTelefone())
            .build();
    }
}