package br.com.tads.dac.flightservice.exceptions;

public class AirportCodeAlreadyExistsException extends RuntimeException{
    public AirportCodeAlreadyExistsException(String message) {
        super(message);
    }
}
