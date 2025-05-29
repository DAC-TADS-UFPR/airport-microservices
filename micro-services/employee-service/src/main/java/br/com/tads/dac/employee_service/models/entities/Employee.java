package br.com.tads.dac.employee_service.models.entities;

import br.com.tads.dac.employee_service.models.dto.EmployeeCreateDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String nome;

    @Column(nullable = false)
    @Size(max = 255, message = "E-mail deve ter no máximo 255 caracteres")
    private String email;

    @Column(unique = true, nullable = false)
    @Size(min = 11, max = 11, message = "CPF deve ter 11 dígitos")
    private String cpf;

    @Column(nullable = false)
    @Size(min = 9, max = 11, message = "Telefone deve ter 11 dígitos")
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
