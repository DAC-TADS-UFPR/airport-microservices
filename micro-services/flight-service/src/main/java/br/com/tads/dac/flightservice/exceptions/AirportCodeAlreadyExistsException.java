package br.com.tads.dac.flightservice.exceptions;

/**
 * Exceção lançada quando um código de aeroporto já existe no sistema.
 */
public class AirportCodeAlreadyExistsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private final String airportCode;

    public AirportCodeAlreadyExistsException(String airportCode) {
        super("Já existe um aeroporto cadastrado com o código: " + airportCode);
        this.airportCode = airportCode;
    }

    public String getAirportCode() {
        return airportCode;
    }
}
