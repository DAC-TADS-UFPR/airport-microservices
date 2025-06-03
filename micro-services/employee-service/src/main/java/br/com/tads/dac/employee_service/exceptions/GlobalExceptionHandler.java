package br.com.tads.dac.employee_service.exceptions;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.hibernate.exception.ConstraintViolationException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponse> handleIllegalArgumentException(IllegalArgumentException ex, HttpServletRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                request.getRequestURI(),
                "Argumento inválido.",
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                List.of()
        );

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
        String errorMessage = String.format("O argumento '%s' possui um valor inválido: '%s'.",
                ex.getName(), ex.getValue());

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                request.getRequestURI(),
                errorMessage,
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                List.of()
        );

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ExceptionResponse.FieldError> fieldErrors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> new ExceptionResponse.FieldError(
                        error.getField(),
                        error.getDefaultMessage()))
                .collect(Collectors.toList());

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                request.getRequestURI(),
                "A validação falhou para um ou mais campos.",
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                fieldErrors
        );

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex, HttpServletRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                request.getRequestURI(),
                "Violação de integridade de dados.",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now(),
                List.of()
        );

        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(Exception.class)
public ResponseEntity<ExceptionResponse> handleAll(Exception ex, HttpServletRequest request) {
    ExceptionResponse body = new ExceptionResponse(
        request.getRequestURI(),
        "Ocorreu um erro inesperado.",
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        LocalDateTime.now(),
        List.of()
    );
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
}
@ExceptionHandler(ConstraintViolationException.class)
public ResponseEntity<ExceptionResponse> handleHibernateConstraintViolation(
        ConstraintViolationException ex, HttpServletRequest request) {

    // Se quiser detalhar cada violação, dá pra iterar em ex.getConstraintName() ou na causa
    // Mas esse ConstraintViolationException do Hibernate normalmente vem quando uma FK ou UNIQUE falha no banco.

    ExceptionResponse response = new ExceptionResponse(
        request.getRequestURI(),
        "Violação de restrição de banco: " + ex.getConstraintName(),
        HttpStatus.BAD_REQUEST.value(), // ou INTERNAL_SERVER_ERROR, dependendo do contexto
        LocalDateTime.now(),
        List.of()
    );
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
}



}
