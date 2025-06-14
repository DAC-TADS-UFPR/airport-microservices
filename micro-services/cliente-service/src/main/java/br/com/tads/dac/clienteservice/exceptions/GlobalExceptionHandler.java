package br.com.tads.dac.clienteservice.exceptions;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.ConversionFailedException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponse> handleIllegalArgumentException(IllegalArgumentException ex, HttpServletRequest request) {
        logger.warn("IllegalArgumentException at {}: {}", request.getRequestURI(), ex.getMessage());
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                "Argumento inválido.",
                HttpStatus.BAD_REQUEST.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
        logger.info("TypeMismatch at {}: {} -> {}", request.getRequestURI(), ex.getName(), ex.getValue());
        String errorMessage = String.format("O argumento '%s' possui um valor inválido: '%s'.",
                ex.getName(), ex.getValue());
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                errorMessage,
                HttpStatus.BAD_REQUEST.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        logger.error("Validation failed at {}: {} errors", request.getRequestURI(), ex.getBindingResult().getErrorCount());
        List<ExceptionResponse.FieldError> fieldErrors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> new ExceptionResponse.FieldError(
                        error.getField(),
                        error.getDefaultMessage()))
                .collect(Collectors.toList());
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                "A validação falhou para um ou mais campos.",
                HttpStatus.BAD_REQUEST.value(),
                fieldErrors
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ClientRegisterException.class)
    public ResponseEntity<ExceptionResponse> handleClientRegisterException(ClientRegisterException ex, HttpServletRequest request) {
        logger.error("ClientRegisterException at {}: {} errors", request.getRequestURI(), ex.getErrors().size());
        List<ExceptionResponse.FieldError> fieldErrors = ex.getErrors()
                .stream()
                .map(error -> new ExceptionResponse.FieldError(
                        error.field(),
                        error.message()))
                .collect(Collectors.toList());
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                "A validação falhou para um ou mais campos.",
                HttpStatus.CONFLICT.value(),
                fieldErrors
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleEntityNotFoundException(EntityNotFoundException ex, HttpServletRequest request) {
        logger.info("EntityNotFound at {}: {}", request.getRequestURI(), ex.getMessage());
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                "Erro ao encontrar cliente.",
                HttpStatus.NOT_FOUND.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex, HttpServletRequest request) {
        logger.error("DataIntegrityViolation at {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                "Violação de integridade de dados.",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
        logger.warn("Malformed JSON at {}: {}", request.getRequestURI(), ex.getMessage());
        String detalhe = ex.getMostSpecificCause() != null 
                ? ex.getMostSpecificCause().getMessage() 
                : ex.getMessage();
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                "Corpo da requisição inválido ou malformado: " + detalhe,
                HttpStatus.BAD_REQUEST.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConversionFailedException.class)
    public ResponseEntity<ExceptionResponse> handleConversionFailed(ConversionFailedException ex, HttpServletRequest request) {
        logger.warn("ConversionFailed at {}: {} -> {}", request.getRequestURI(), ex.getValue(), ex.getTargetType());
        String valor = ex.getValue() != null ? ex.getValue().toString() : "null";
        String tipoDestino = ex.getTargetType() != null ? ex.getTargetType().toString() : "desconhecido";
        String msg = String.format("Falha ao converter o valor '%s' para o tipo '%s'.", valor, tipoDestino);
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                msg,
                HttpStatus.BAD_REQUEST.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ExceptionResponse> handleMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex, HttpServletRequest request) {
        logger.warn("UnsupportedMediaType at {}: {}", request.getRequestURI(), ex.getContentType());
        StringBuilder sb = new StringBuilder();
        sb.append("Tipo de mídia não suportado: ").append(ex.getContentType()).append(". ");
        sb.append("Tipos suportados: ");
        ex.getSupportedMediaTypes().forEach(mt -> sb.append(mt).append(", "));
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                sb.toString(),
                HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ExceptionResponse> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {
        logger.warn("MethodNotAllowed at {}: {}", request.getRequestURI(), ex.getMethod());
        String métodosSuportados = ex.getSupportedHttpMethods() != null
                ? ex.getSupportedHttpMethods().stream().map(method -> method.name()).collect(Collectors.joining(", "))
                : "";
        String msg = String.format("Método '%s' não suportado. Métodos suportados: %s.",
                ex.getMethod(), métodosSuportados);
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                msg,
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleAllUncaught(Exception ex, HttpServletRequest request) {
        logger.error("Unexpected error at {}", request.getRequestURI(), ex);
        ExceptionResponse exceptionResponse = buildResponse(
                request.getRequestURI(),
                "Erro interno inesperado.",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                List.of()
        );
        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ExceptionResponse buildResponse(String path, String message, int status, List<ExceptionResponse.FieldError> errors) {
        return new ExceptionResponse(
                path,
                message,
                status,
                LocalDateTime.now(),
                errors
        );
    }
}
