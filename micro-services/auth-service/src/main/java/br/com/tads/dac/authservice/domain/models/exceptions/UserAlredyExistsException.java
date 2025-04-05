package br.com.tads.dac.authservice.domain.models.exceptions;

public class UserAlredyExistsException extends RuntimeException {
    public UserAlredyExistsException(String message) {
        super(message);
    }
    public UserAlredyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
