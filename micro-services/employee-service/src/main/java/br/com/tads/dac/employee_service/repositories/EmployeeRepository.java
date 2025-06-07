package br.com.tads.dac.employee_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tads.dac.employee_service.models.entities.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,String> {
    Optional<Employee> findByCpf(String cpf);
    List<Employee> findAllByActiveTrue();
    Optional<Employee> findByCpfAndActiveTrue(String id);
    Optional<Employee> findByIdAndStatus(String id, boolean b);
}
