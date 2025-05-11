package br.com.tads.dac.authservice.domain.models.dto;

import br.com.tads.dac.authservice.domain.models.entities.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {
    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Formato de email inválido")
    private String email;
    
    @NotNull(message = "User type é obrigatório")
    private UserRole userType;

    @NotBlank(message = "O nome é obrigatório")
    private String name;

    private String userId;
}