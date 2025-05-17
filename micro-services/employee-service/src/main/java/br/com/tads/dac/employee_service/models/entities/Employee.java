package br.com.tads.dac.employee_service.models.entities;

import br.com.tads.dac.employee_service.models.dto.EmployeeCreateDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "employee")
@Where(clause = "active = true")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String codigo;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String cpf;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private boolean active = true;

    public Employee(EmployeeCreateDTO employeeCreateDTO) {
        this.nome = employeeCreateDTO.nome();
        this.email = employeeCreateDTO.email();
        this.cpf = employeeCreateDTO.cpf();
        this.telefone = employeeCreateDTO.telefone();
    }
}
