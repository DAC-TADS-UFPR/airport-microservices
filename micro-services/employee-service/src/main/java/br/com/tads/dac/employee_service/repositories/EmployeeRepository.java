package br.com.tads.dac.employee_service.repositories;

import br.com.tads.dac.employee_service.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
