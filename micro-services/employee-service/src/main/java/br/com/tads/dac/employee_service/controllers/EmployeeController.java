package br.com.tads.dac.employee_service.controllers;

import br.com.tads.dac.employee_service.models.dto.EmployeeCreateDTO;
import br.com.tads.dac.employee_service.models.dto.EmployeeUpdateDTO;
import br.com.tads.dac.employee_service.models.entities.Employee;
import br.com.tads.dac.employee_service.services.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> create(@RequestBody @Valid EmployeeCreateDTO employeeCreateDTO) {
            Employee employee_created = new Employee(employeeCreateDTO);
            this.employeeService.create(employee_created);
            return ResponseEntity.status(HttpStatus.CREATED).body(employee_created);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<EmployeeUpdateDTO> update(@PathVariable Long id,@RequestBody @Valid EmployeeUpdateDTO employeeUpdateDTO) {
        Employee employee_updated = employeeService.update(id,employeeUpdateDTO);
        EmployeeUpdateDTO responseDTO = new EmployeeUpdateDTO(
                employee_updated.getName(),
                employee_updated.getEmail(),
                employee_updated.getPhone()
        );
        return ResponseEntity.ok().body(responseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        return ResponseEntity.ok(employeeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable Long id) {
        return employeeService.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }



}
