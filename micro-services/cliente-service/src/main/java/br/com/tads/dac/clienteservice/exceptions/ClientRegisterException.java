package br.com.tads.dac.clienteservice.exceptions;

import java.util.List;

public class ClientRegisterException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private List<FieldError> errors;

    public ClientRegisterException(String message , List<FieldError> errors) {
        super(message);
        this.errors = errors;
    }

    public ClientRegisterException(String message, Throwable cause) {
        super(message, cause);
    }

    public ClientRegisterException(Throwable cause) {
        super(cause);
    }

    public List<FieldError> getErrors() {
        return errors;
    }

    
}
