package com.example.bookitnowbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class TokenService {

    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private JwtDecoder jwtDecoder;

    public String generateJwt(Authentication auth, Integer id)
    {
        Instant now = Instant.now();
        Duration validityDuration = Duration.ofMinutes(30);
        Instant expirationTime = now.plus(validityDuration);

        String scope = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(String.valueOf(id))
                .expiresAt(expirationTime)
                .claim("roles", scope)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public Jwt decodeJwt(String jwt)
    {
        var decode = jwtDecoder.decode(jwt);
        System.out.println(decode.getSubject());
        System.out.println(decode.getClaims());

        return decode;
    }
}
