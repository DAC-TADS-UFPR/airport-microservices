package br.com.tads.dac.authservice.domain.services;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.tads.dac.authservice.domain.models.dto.CreateUserRequest;
import br.com.tads.dac.authservice.domain.models.dto.UserDTO;
import br.com.tads.dac.authservice.domain.models.entities.User;
import br.com.tads.dac.authservice.domain.models.exceptions.UserAlredyExistsException;
import br.com.tads.dac.authservice.domain.repositories.UserRepository;
import br.com.tads.dac.authservice.infraestructure.mappers.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email: " + email));
    }
    public User findByUserId(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com id: " + userId));
    }

    public UserDTO createUser(CreateUserRequest createUserDTO) {
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new UserAlredyExistsException("Já existe um usuário com o email: " + createUserDTO.getEmail());
        }
        
        User user = userMapper.toEntity(createUserDTO);
        return userMapper.toDTO(userRepository.save(user));
    }
}
