package br.com.tads.dac.authservice.domain.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import br.com.tads.dac.authservice.domain.models.dto.AuthRequest;
import br.com.tads.dac.authservice.domain.models.dto.AuthResponse;
import br.com.tads.dac.authservice.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
            )
        );
        
        var user = userRepository.findByEmail(request.email())
            .orElseThrow();
        
        var jwtToken = tokenService.generateToken(user);
        
        return AuthResponse.builder()
            .accessToken(jwtToken)
            .tokenType("Bearer")
            .userType(user.getUserType())
            .userId(user.getUserId())
            .email(user.getEmail())
            .build();
    }

    public boolean validateToken(String token) {
        return tokenService.isTokenValid(token);
    }
}
