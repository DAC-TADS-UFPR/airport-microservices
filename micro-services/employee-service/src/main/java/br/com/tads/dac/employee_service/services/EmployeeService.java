package br.com.tads.dac.employee_service.services;

import br.com.tads.dac.employee_service.exceptions.CpfAlreadyExistsException;
import br.com.tads.dac.employee_service.exceptions.ResourceNotFoundException;
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

    public Employee create(Employee employee) {
        Optional<Employee> existingEmployee = employeeRepository.findByCpf(employee.getCpf());
        if (existingEmployee.isPresent()) {
            throw new CpfAlreadyExistsException("CPF já cadastrado.");
        }
        return employeeRepository.save(employee);
    }

    public Employee update(Long id, EmployeeUpdateDTO employeeUpdateDTO) {
        try {
            Employee entity = employeeRepository.getReferenceById(id);
            updateData(entity,employeeUpdateDTO);
            return employeeRepository.save(entity);
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

    public void delete(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Funcionario nao encontrado"));
        employee.setActive(false);
        employeeRepository.save(employee);
    }

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getById(Long id) {
        return employeeRepository.findById(id);
    }

}
