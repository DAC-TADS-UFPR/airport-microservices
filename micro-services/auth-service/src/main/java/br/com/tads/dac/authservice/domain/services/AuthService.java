package br.com.tads.dac.authservice.domain.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import br.com.tads.dac.authservice.domain.models.dto.AuthRequest;
import br.com.tads.dac.authservice.domain.models.dto.AuthResponse;
import br.com.tads.dac.authservice.domain.models.dto.UserDTO;
import br.com.tads.dac.authservice.domain.repositories.UserRepository;
import br.com.tads.dac.authservice.infraestructure.mappers.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.login(),
                request.senha()
            )
        );
        
        var user = userRepository.findByEmail(request.login())
            .orElseThrow();
        
        var jwtToken = tokenService.generateToken(user);
        
        var userDto = userMapper.toDTO(user);

        return AuthResponse.builder()
            .accessToken(jwtToken)
            .tokenType("Bearer")
            .tipo(user.getUserType())
            .usuario(userDto)
            .isAuthenticated(true)
            .build();
    }

    public AuthResponse validateToken(String token) {
        if(tokenService.isTokenValid(token)){
            UserDTO user = userMapper.toDTO(tokenService.getUser(token)) ;
            return AuthResponse.builder()
                            .accessToken(token)
                            .tokenType("Bearer")
                            .tipo(user.getTipo())
                            .isAuthenticated(true)
                            .usuario(user)
                            .build();
        }
        return AuthResponse.builder()
                            .accessToken(token)
                            .tokenType("Bearer")
                            .tipo(null)
                            .usuario(null)
                            .isAuthenticated(false)
                            .build();
    }
}
