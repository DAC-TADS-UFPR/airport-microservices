package br.com.tads.dac.authservice.domain.services;

import java.security.SecureRandom;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private static final SecureRandom random = new SecureRandom();

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
        user.setPassword(new BCryptPasswordEncoder().encode(gerarSenha4Digitos()));
        return userMapper.toDTO(userRepository.save(user));
    }

    public static String gerarSenha4Digitos() {
        int numero = random.nextInt(10_000); 
        return "1234";
        //return String.format("%04d", numero);
    }

}
