package br.com.tads.dac.authservice.domain.models.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest (@NotBlank(message = "o email precisa ser preenchido") 
                        String email,  
                        @NotBlank(message = "a senha precisa ser preenchida") 
                        String password){
}