package com.comunidadetech.api.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST, "Falha na validação dos campos da requisição"
        );
        problemDetail.setTitle("Bad Request - Validação");
        problemDetail.setType(URI.create("https://comunidade.tech.lucivaldo.cloud/erros/validacao"));
        problemDetail.setProperty("timestamp", Instant.now());

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        problemDetail.setProperty("errors", errors);

        return problemDetail;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGeneralException(Exception ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR, "Ocorreu um erro interno no servidor"
        );
        problemDetail.setTitle("Internal Server Error");
        problemDetail.setType(URI.create("https://comunidade.tech.lucivaldo.cloud/erros/interno"));
        problemDetail.setProperty("timestamp", Instant.now());
        problemDetail.setProperty("detalhe", ex.getMessage());

        return problemDetail;
    }
}
