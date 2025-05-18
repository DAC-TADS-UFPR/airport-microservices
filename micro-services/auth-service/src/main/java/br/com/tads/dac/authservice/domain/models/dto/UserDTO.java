package br.com.tads.dac.authservice.domain.models.dto;

import br.com.tads.dac.authservice.domain.models.entities.UserRole;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDTO{
    private String id;
    private String email;
    private String nome;
    private String userId;
    private UserRole tipo;
}
