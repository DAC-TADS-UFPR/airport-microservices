package br.com.tads.dac.authservice.infraestructure.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.com.tads.dac.authservice.domain.models.dto.CreateUserRequest;
import br.com.tads.dac.authservice.domain.models.entities.UserRole;
import br.com.tads.dac.authservice.domain.services.UserService;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedUser(UserService service) {
        return args -> {
            CreateUserRequest user = CreateUserRequest.builder()
                .login("func_pre@gmail.com")
                .nome("Funcionário Pré-cadastrado")
                .tipo(UserRole.FUNCIONARIO)
                .senha("TADS")
                .userId("90769281001")
                .build();

            try {
                service.createUser(user);
                System.out.println(">> Usuário inicial inserido");
            } catch (Exception e) {
                System.out.println(">> Usuário já existe");
            }
        };
    }
}