package com.example.animalshelter.exceptionhandling;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice() //exception handling for controller (declutter)
public class RestExceptionHandler {

    //handles errors of @RequestBody if required attributes are missing or null (with @Valid + @NotBlank = @NotNull)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        //Binding Result interface can provide details of the error
        Map<String, Object> body = new HashMap<>();
        List<String> errors = ex.getBindingResult().getAllErrors().stream().map(error -> error.getDefaultMessage()).toList();

        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value()); //add status code
        body.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase()); //gives error type
        body.put("message", errors); //add error message(s)
        body.put("hasError", true);

        for(String e: errors) {
            log.error("Validation failed. Exception message: {}", e);
        }

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    //handles not found errors (thrown as new HttpClientErrorException)
    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<Object> handleNotFound(HttpClientErrorException ex) {
        Map<String, Object> body = new HashMap<>();
        String message = ex.getMessage();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.NOT_FOUND.value()); //add status code
        body.put("error", HttpStatus.NOT_FOUND.getReasonPhrase()); //gives error type
        body.put("message", message.substring(4)); //add error message
        body.put("hasError", true);

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    //handles duplicate key errors
    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Object> handleDuplicateKeyException(DuplicateKeyException ex) {
        Map<String, Object> body = new HashMap<>();
        String message = ex.getMessage();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.CONFLICT.value()); //add status code
        body.put("error", HttpStatus.CONFLICT.getReasonPhrase()); //gives error type
        body.put("message", message); //add error message
        body.put("hasError", true);

        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }

    //handles illegal argument exceptions
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, Object> body = new HashMap<>();
        String message = ex.getMessage();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value()); //add status code
        body.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase()); //gives error type
        body.put("message", message); //add error message
        body.put("hasError", true);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    //handles UsernameNotFound
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        Map<String, Object> body = new HashMap<>();
        String message = ex.getMessage();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.NOT_FOUND.value()); //add status code
        body.put("error", HttpStatus.NOT_FOUND.getReasonPhrase()); //gives error type
        body.put("message", message); //add error message
        body.put("hasError", true);

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    //handler for additional - AuthenticationE, BadCredentials, SignatureE, AccessDenied, ExpiredJwt, Unknown

}
