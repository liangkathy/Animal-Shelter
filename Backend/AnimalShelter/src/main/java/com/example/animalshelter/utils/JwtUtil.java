package com.example.animalshelter.utils;

import com.example.animalshelter.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;


@Component
public class JwtUtil {
    //jwt attributes: expiration time and secret key > set in application properties (not pushed to gh)
    @Value("${spring.app.jwtExpirationMs}")
    private long jwtExpirationMs; //expiration to access (if any)

    @Value("${spring.app.jwtSecret}")
    private String jwtSecret; //for assigning tokens, set up in application properties

    public String generateToken(Authentication authentication) {
        //get username and roles as list from authentication object
        String username = authentication.getName();
        String roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // token create date and set expiration
        Date createdDate = new Date();
        Date expirationDate = new Date(createdDate.getTime() + jwtExpirationMs);

        //create jwt
        return Jwts.builder()
                .subject(username) //set username as subject
                .claim("roles", roles) //claim = a piece of information about a user that is included in a JWT payload
                .issuedAt(createdDate)
                .expiration(expirationDate)
                .signWith(getSignInKey()) //method details below
                .compact(); //build token
    }

    //extract all claims
    public Claims extractAllClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Key getSignInKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)); //Creates a new SecretKey instance for use with HMAC-SHA algorithm
        //note: base64 is a commonly used binary to text encoding scheme
    }

    //extract claim
    public <T>T extractClaim(String token, Function<Claims,T> claimsResolver) {
        final Claims claims = extractAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    //get username from token
    public String getUsernameFromToken(String token) {
        return extractClaim(token, Claims::getSubject); //username was set as subject of jwt
    }

    //get expiration date from token (set for 10 days)
    public Date getExpirationFromToken(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    //check if expired
    public Boolean isTokenExpired(String token) {
        return getExpirationFromToken(token).before(new Date()); //true if expired and false if not expired
    }

    //validate token
    public Boolean validateToken(String token, String username) {
        final String usernameFromToken = getUsernameFromToken(token);
        return (username.equals(usernameFromToken) && !isTokenExpired(token)); //confirm username matches token and not expired
    }

    
}
