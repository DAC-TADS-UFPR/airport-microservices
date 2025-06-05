package br.com.tads.dac.employee_service.exceptions;

import java.time.LocalDateTime;
import java.util.Objects;

public class EmployeeValidationException extends RuntimeException {

    private static final long serialVersionUID = 2L;

    private final ErrorType errorType;
    private final String field;
    private final String rejectedValue;
    private final LocalDateTime timestamp;
    private final String details;

    public enum ErrorType {
        INVALID_NAME,
        INVALID_EMAIL,
        INVALID_CPF,
        INVALID_DEPARTMENT,
        DUPLICATE_ENTRY,
        UNKNOWN
    }

    public EmployeeValidationException(ErrorType errorType, String field, String rejectedValue, String details) {
        super(buildMessage(errorType, field, rejectedValue, details));
        this.errorType = errorType;
        this.field = field;
        this.rejectedValue = rejectedValue;
        this.timestamp = LocalDateTime.now();
        this.details = details;
    }

    public EmployeeValidationException(ErrorType errorType, String field, String rejectedValue) {
        this(errorType, field, rejectedValue, null);
    }

    public EmployeeValidationException(String message) {
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
        return "EmployeeValidationException{" +
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
        if (!(o instanceof EmployeeValidationException)) return false;
        EmployeeValidationException that = (EmployeeValidationException) o;
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

    public static EmployeeValidationException invalidName(String rejectedValue) {
        return new EmployeeValidationException(ErrorType.INVALID_NAME, "name", rejectedValue, "Nome não atende aos critérios de validação.");
    }

    public static EmployeeValidationException invalidEmail(String rejectedValue) {
        return new EmployeeValidationException(ErrorType.INVALID_EMAIL, "email", rejectedValue, "Formato de e-mail inválido.");
    }

    public static EmployeeValidationException invalidCpf(String rejectedValue) {
        return new EmployeeValidationException(ErrorType.INVALID_CPF, "cpf", rejectedValue, "CPF inválido.");
    }
}
