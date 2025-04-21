package br.com.tads.dac.employee_service.controllers;


import br.com.tads.dac.employee_service.models.entities.Employee;
import br.com.tads.dac.employee_service.services.EmployeeService;
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
    public ResponseEntity<Employee> create(@RequestBody Employee employee) {
            Employee employee_created = employeeService.create(employee);
            return ResponseEntity.status(HttpStatus.CREATED).body(employee_created);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Employee> update(@PathVariable Long id,@RequestBody Employee employee) {
        Employee employee_updated = employeeService.update(id,employee);
        return ResponseEntity.ok().body(employee_updated);
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
