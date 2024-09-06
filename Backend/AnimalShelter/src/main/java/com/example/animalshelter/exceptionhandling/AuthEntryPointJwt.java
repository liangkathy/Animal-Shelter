package com.example.animalshelter.exceptionhandling;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class AuthEntryPointJwt  implements AuthenticationEntryPoint{

    private final HttpServletResponse httpServletResponse; //passed as an argument to the servlet's service methods (post, get, etc.)

    public AuthEntryPointJwt(HttpServletResponse httpServletResponse) {
        this.httpServletResponse = httpServletResponse;
    } //for unauthorized requests

    //abstracted from interface > handles access denied or authentication exceptions (used by Exception Translation Filter)
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.error("Unauthorized error: {}", authException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); //401 status

        //timestamp formatter (string instead of array)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
        String timestamp = LocalDateTime.now().format(formatter);

        //give user a response for the error
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", timestamp);
        body.put("status", HttpStatus.UNAUTHORIZED.value()); //add status code
        body.put("error", HttpStatus.UNAUTHORIZED.getReasonPhrase()); //gives error type
        body.put("message", "Invalid username or password"); //add error message
        body.put("hasError", true);

        ObjectMapper mapper = JsonMapper.builder()
                .addModule(new JavaTimeModule())
                .build();
        mapper.writeValue(response.getOutputStream(), body); //return is void for the abstract method
    }

}
