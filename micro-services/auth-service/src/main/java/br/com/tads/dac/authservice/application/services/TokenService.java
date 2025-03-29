package br.com.tads.dac.authservice.application.services;

public interface TokenService {
    public String generateToken();
    public boolean validateToken();
}
