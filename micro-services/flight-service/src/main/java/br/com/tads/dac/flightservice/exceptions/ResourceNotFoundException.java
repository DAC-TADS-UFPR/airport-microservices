package br.com.tads.dac.flightservice.exceptions;

/**
 * Exceção lançada quando um recurso não é encontrado.
 */
public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private final Object resourceId;

    public ResourceNotFoundException(Object id) {
        super("Recurso não encontrado. ID: " + id);
        this.resourceId = id;
    }

    public Object getResourceId() {
        return resourceId;
    }
}
