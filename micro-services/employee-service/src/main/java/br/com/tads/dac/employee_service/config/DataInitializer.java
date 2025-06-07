package br.com.tads.dac.employee_service.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.com.tads.dac.employee_service.models.dto.EmployeeCreateDTO;
import br.com.tads.dac.employee_service.services.EmployeeService;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedEmployee(EmployeeService service) {
        return args -> {
            if (service.getAll().isEmpty()) {
                service.create(new EmployeeCreateDTO(
                    "Funcionário Pré-cadastrado",
                    "func_pre@gmail.com",
                    "90769281001",
                    "44999999999"
                ));
                System.out.println(">> Funcionário inicial inserido");
            }
        };
    }
}