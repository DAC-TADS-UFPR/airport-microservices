package br.com.tads.dac.authservice.domain.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tads.dac.authservice.domain.models.dto.AuthRequest;
import br.com.tads.dac.authservice.domain.models.dto.AuthResponse;
import br.com.tads.dac.authservice.domain.models.dto.CreateUserRequest;
import br.com.tads.dac.authservice.domain.models.dto.UserDTO;
import br.com.tads.dac.authservice.domain.services.AuthService;
import br.com.tads.dac.authservice.domain.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private  AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/validate")
    public ResponseEntity<AuthResponse> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(null);
        }
        
        String token = authHeader.substring(7);
        AuthResponse authResponse = authService.validateToken(token);
        if (!authResponse.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
        }
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserRequest createUserDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.createUser(createUserDTO));
        
    }
}