package br.com.tads.dac.employee_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tads.dac.employee_service.models.entities.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    Optional<Employee> findByCpf(String cpf);
}
