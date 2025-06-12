package br.com.tads.dac.flightservice.exceptions;

import java.time.LocalDateTime;
import java.util.Objects;

public class FlightValidationException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final ErrorType errorType;
    private final String field;
    private final String rejectedValue;
    private final LocalDateTime timestamp;
    private final String details;

    public enum ErrorType {
        INVALID_DATE,
        INVALID_AIRPORT,
        INVALID_STATE,
        INVALID_SEAT_COUNT,
        DUPLICATE_FLIGHT,
        FLIGHT_NOT_FOUND,
        UNKNOWN
    }

    public FlightValidationException(ErrorType errorType, String field, String rejectedValue, String details) {
        super(buildMessage(errorType, field, rejectedValue, details));
        this.errorType = errorType;
        this.field = field;
        this.rejectedValue = rejectedValue;
        this.timestamp = LocalDateTime.now();
        this.details = details;
    }

    public FlightValidationException(ErrorType errorType, String field, String rejectedValue) {
        this(errorType, field, rejectedValue, null);
    }

    public FlightValidationException(String message) {
        super(message);
        this.errorType = ErrorType.UNKNOWN;
        this.field = null;
        this.rejectedValue = null;
        this.timestamp = LocalDateTime.now();
        this.details = null;
    }

    private static String buildMessage(ErrorType errorType, String field, String rejectedValue, String details) {
        StringBuilder sb = new StringBuilder();
        sb.append("Erro de validação [").append(errorType).append("] no campo '")
                .append(field).append("'");
        if (rejectedValue != null) {
            sb.append(" (valor rejeitado: ").append(rejectedValue).append(")");
        }
        if (details != null && !details.isEmpty()) {
            sb.append(" - ").append(details);
        }
        return sb.toString();
    }

    public ErrorType getErrorType() {
        return errorType;
    }

    public String getField() {
        return field;
    }

    public String getRejectedValue() {
        return rejectedValue;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getDetails() {
        return details;
    }

    @Override
    public String toString() {
        return "FlightValidationException{" +
                "errorType=" + errorType +
                ", field='" + field + '\'' +
                ", rejectedValue='" + rejectedValue + '\'' +
                ", timestamp=" + timestamp +
                ", details='" + details + '\'' +
                ", message='" + getMessage() + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FlightValidationException)) return false;
        FlightValidationException that = (FlightValidationException) o;
        return errorType == that.errorType &&
                Objects.equals(field, that.field) &&
                Objects.equals(rejectedValue, that.rejectedValue) &&
                Objects.equals(timestamp, that.timestamp) &&
                Objects.equals(details, that.details);
    }

    @Override
    public int hashCode() {
        return Objects.hash(errorType, field, rejectedValue, timestamp, details);
    }

    public static FlightValidationException invalidDate(String rejectedValue) {
        return new FlightValidationException(ErrorType.INVALID_DATE, "data", rejectedValue, "Data do voo inválida.");
    }

    public static FlightValidationException invalidAirport(String field, String rejectedValue) {
        return new FlightValidationException(ErrorType.INVALID_AIRPORT, field, rejectedValue, "Código de aeroporto inválido.");
    }

    public static FlightValidationException invalidState(String rejectedValue) {
        return new FlightValidationException(ErrorType.INVALID_STATE, "estado", rejectedValue, "Estado do voo inválido.");
    }

    public static FlightValidationException invalidSeatCount(String field, String rejectedValue) {
        return new FlightValidationException(ErrorType.INVALID_SEAT_COUNT, field, rejectedValue, "Quantidade de poltronas inválida.");
    }

    public static FlightValidationException duplicateFlight(String details) {
        return new FlightValidationException(ErrorType.DUPLICATE_FLIGHT, "codigo", null, details);
    }

    public static FlightValidationException flightNotFound(String rejectedValue) {
        return new FlightValidationException(ErrorType.FLIGHT_NOT_FOUND, "codigo", rejectedValue, "Voo não encontrado.");
    }
}
