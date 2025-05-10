package br.com.tads.dac.employee_service.controllers;

import br.com.tads.dac.employee_service.models.dto.EmployeeCreateDTO;
import br.com.tads.dac.employee_service.models.dto.EmployeeUpdateDTO;
import br.com.tads.dac.employee_service.models.entities.Employee;
import br.com.tads.dac.employee_service.services.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/funcionarios")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    @Operation(summary = "Criar novo funcionário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Funcionário criado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeCreateDTO.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<Employee> create(@RequestBody @Valid EmployeeCreateDTO employeeCreateDTO) {
            Employee employee_created = new Employee(employeeCreateDTO);
            this.employeeService.create(employee_created);
            return ResponseEntity.status(HttpStatus.CREATED).body(employee_created);
    }

    @PutMapping(value = "/{id}")
    @Operation(summary = "Atualizar funcionário por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Funcionário atualizado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmployeeUpdateDTO.class))),
            @ApiResponse(responseCode = "404", description = "Funcionário não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
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
    @Operation(summary = "Deletar funcionário por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Funcionário deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Funcionário não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @Operation(summary = "Listar todos os funcionários")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Funcionários retornados com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<List<Employee>> getAll() {
        return ResponseEntity.ok(employeeService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar funcionário por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Funcionário encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Employee.class))),
            @ApiResponse(responseCode = "404", description = "Funcionário não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<Employee> getById(@PathVariable Long id) {
        return employeeService.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }



}
