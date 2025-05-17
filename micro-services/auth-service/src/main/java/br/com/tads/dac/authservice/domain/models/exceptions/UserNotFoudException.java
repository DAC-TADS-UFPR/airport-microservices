package br.com.tads.dac.authservice.domain.models.exceptions;

public class UserNotFoudException  extends RuntimeException {
    public UserNotFoudException(String message) {
        super(message);
    }
    public UserNotFoudException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
