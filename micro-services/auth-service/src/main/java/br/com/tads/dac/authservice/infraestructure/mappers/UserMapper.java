package br.com.tads.dac.authservice.infraestructure.mappers;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import br.com.tads.dac.authservice.domain.models.dto.CreateUserRequest;
import br.com.tads.dac.authservice.domain.models.dto.UserDTO;
import br.com.tads.dac.authservice.domain.models.entities.User;

@Component
public class UserMapper {

    public User toEntity(CreateUserRequest dto) {
        
        return User.builder()
                .email(dto.getLogin())
                .status(true)
                .userType(dto.getTipo())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .name(dto.getNome())
                .userId(dto.getUserId())
                .build();
    }

    public UserDTO toDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userId(user.getUserId())
                .name(user.getName())
                .role(user.getUserType())
                .build();
    }
}