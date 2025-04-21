package br.com.tads.dac.employee_service.exceptions;


import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public record ExceptionResponse(
        String path,
        String message,
        int statusCode,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dateTime,
        List<FieldError> errors
) {
    public record FieldError(String field, String message) {
    }
}