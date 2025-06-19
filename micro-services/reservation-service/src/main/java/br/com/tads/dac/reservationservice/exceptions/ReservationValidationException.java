package br.com.tads.dac.reservationservice.exceptions;
import java.time.LocalDateTime;
import java.util.Objects;

public class ReservationValidationException {
    private static final long serialVersionUID = 1L;

    private final ErrorType errorType;
    private final String field;
    private final String rejectedValue;
    private final LocalDateTime timestamp;
    private final String details;

    public enum ErrorType {
        INVALID_DATE,
        INVALID_CLIENT,
        INVALID_FLIGHT,
        INVALID_SEAT,
        DUPLICATE_RESERVATION,
        RESERVATION_NOT_FOUND,
        PAYMENT_ERROR,
        UNKNOWN
    }

    public ReservationValidationException(ErrorType errorType, String field, String rejectedValue, String details) {
        this.errorType = errorType;
        this.field = field;
        this.rejectedValue = rejectedValue;
        this.timestamp = LocalDateTime.now();
        this.details = details;
    }

    public ReservationValidationException(ErrorType errorType, String field, String rejectedValue) {
        this(errorType, field, rejectedValue, null);
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
        return "ReservationValidationException{" +
                "errorType=" + errorType +
                ", field='" + field + '\'' +
                ", rejectedValue='" + rejectedValue + '\'' +
                ", timestamp=" + timestamp +
                ", details='" + details + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ReservationValidationException)) return false;
        ReservationValidationException that = (ReservationValidationException) o;
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

    public static ReservationValidationException invalidDate(String rejectedValue) {
        return new ReservationValidationException(ErrorType.INVALID_DATE, "data", rejectedValue, "Data da reserva inválida.");
    }

    public static ReservationValidationException invalidClient(String rejectedValue) {
        return new ReservationValidationException(ErrorType.INVALID_CLIENT, "clienteId", rejectedValue, "Cliente inválido.");
    }

    public static ReservationValidationException invalidFlight(String rejectedValue) {
        return new ReservationValidationException(ErrorType.INVALID_FLIGHT, "flightId", rejectedValue, "Voo inválido.");
    }

    public static ReservationValidationException invalidSeat(String rejectedValue) {
        return new ReservationValidationException(ErrorType.INVALID_SEAT, "assento", rejectedValue, "Assento inválido ou já ocupado.");
    }

    public static ReservationValidationException duplicateReservation(String details) {
        return new ReservationValidationException(ErrorType.DUPLICATE_RESERVATION, "reserva", null, details);
    }

    public static ReservationValidationException reservationNotFound(String rejectedValue) {
        return new ReservationValidationException(ErrorType.RESERVATION_NOT_FOUND, "reservaId", rejectedValue, "Reserva não encontrada.");
    }

    public static ReservationValidationException paymentError(String details) {
        return new ReservationValidationException(ErrorType.PAYMENT_ERROR, "pagamento", null, details);
    }
}
