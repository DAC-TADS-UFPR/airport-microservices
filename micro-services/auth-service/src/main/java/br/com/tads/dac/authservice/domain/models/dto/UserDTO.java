package br.com.tads.dac.authservice.domain.models.dto;

import br.com.tads.dac.authservice.domain.models.entities.UserRole;
import lombok.Builder;

@Builder
public record UserDTO (
    String id,
    String email,
    UserRole role
){}
