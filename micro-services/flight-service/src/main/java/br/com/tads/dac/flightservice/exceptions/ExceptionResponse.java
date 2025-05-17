package br.com.tads.dac.flightservice.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Representa uma estrutura padrão para respostas de exceção.
 *
 * @param path       Caminho da requisição que gerou o erro.
 * @param message    Mensagem principal do erro.
 * @param statusCode Código de status HTTP.
 * @param dateTime   Data e hora em que o erro ocorreu.
 * @param errors     Lista opcional de erros de campos específicos.
 */
public record ExceptionResponse(
        String path,
        String message,
        int statusCode,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime dateTime,

        @JsonInclude(JsonInclude.Include.NON_NULL)
        List<FieldError> errors
) {
    /**
     * Representa um erro relacionado a um campo específico da requisição.
     *
     * @param field   Nome do campo.
     * @param message Mensagem de erro associada ao campo.
     */
    public record FieldError(String field, String message) {
    }
}
