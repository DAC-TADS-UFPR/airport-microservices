package br.com.tads.dac.employee_service.controllers;


import br.com.tads.dac.employee_service.entities.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    public ResponseEntity create(@RequestBody Employee employee) {
            return new ResponseEntity(HttpStatus.OK);
    }


}
