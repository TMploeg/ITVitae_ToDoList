package com.java55.itvitaetodolist.security;

import io.jsonwebtoken.Jwts;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecretKey secretKey() {
        return Jwts.SIG.HS256.key().build();
    }
}
