package br.com.tads.dac.employee_service.services;

import br.com.tads.dac.employee_service.exceptions.CpfAlreadyExistsException;
import br.com.tads.dac.employee_service.exceptions.ResourceNotFoundException;
import br.com.tads.dac.employee_service.mappers.EmployeeMapper;
import br.com.tads.dac.employee_service.models.dto.EmployeeCreateDTO;
import br.com.tads.dac.employee_service.models.dto.EmployeeDTO;
import br.com.tads.dac.employee_service.models.dto.EmployeeUpdateDTO;
import br.com.tads.dac.employee_service.models.entities.Employee;
import br.com.tads.dac.employee_service.repositories.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired 
    private EmployeeMapper mapper;

    public EmployeeDTO create(EmployeeCreateDTO dto) {
        Employee employee_created = new Employee(dto);
        Optional<Employee> existingEmployee = employeeRepository.findByCpf(dto.cpf());
        if (existingEmployee.isPresent()) {
            throw new CpfAlreadyExistsException("CPF já cadastrado.");
        }
        return mapper.toDto(employeeRepository.save(employee_created));
    }

    public EmployeeDTO update(String id, EmployeeUpdateDTO employeeUpdateDTO) {
        try {
            Employee entity = employeeRepository.getReferenceById(id);
            updateData(entity,employeeUpdateDTO);
            return mapper.toDto(employeeRepository.save(entity));
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Employee entity, EmployeeUpdateDTO obj) {
        entity.setName(obj.name());
        entity.setEmail(obj.email());
        entity.setPhone(obj.phone());
    }

    public void delete(String id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Funcionario nao encontrado"));
        employee.setActive(false);
        employeeRepository.save(employee);
    }

    public List<EmployeeDTO> getAll() {
        return employeeRepository.findAll().stream()
                .map(employee -> mapper.toDto(employee))
                .toList();
    }

    public EmployeeDTO getById(String id) {
        return employeeRepository.findById(id).map(employee -> mapper.toDto(employee))
                .orElseThrow(() -> new ResourceNotFoundException(id));  
    }

}
