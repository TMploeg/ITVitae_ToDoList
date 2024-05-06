package com.java55.itvitaetodolist.security;

import com.java55.itvitaetodolist.users.User;
import com.java55.itvitaetodolist.users.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserService userService;
    private final JwtService jwtService;

    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";
    private static final String AUTHORIZATION_HEADER_JWT_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain)
            throws ServletException, IOException {

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
        }

        if (requestHasValidAuthHeader(request)) {
            getUserFromAuthorizationHeader(request.getHeader(AUTHORIZATION_HEADER_NAME))
                .ifPresent(
                    principal -> {
                        UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                principal,
                                null,
                                principal.getAuthorities()
                            );

                        authToken.setDetails(
                                new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                        );

                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                );
        }

        filterChain.doFilter(request, response);
    }

    private static boolean requestHasValidAuthHeader(HttpServletRequest request) {
        String authHeader = request.getHeader(AUTHORIZATION_HEADER_NAME);
        return authHeader != null && authHeader.startsWith(AUTHORIZATION_HEADER_JWT_PREFIX);
    }

    private Optional<User> getUserFromAuthorizationHeader(String authorization) {
        if (authorization == null || !authorization.startsWith(AUTHORIZATION_HEADER_JWT_PREFIX)) {
            return Optional.empty();
        }

        return jwtService
                .readToken(authorization.substring(AUTHORIZATION_HEADER_JWT_PREFIX.length()))
                .filter(token -> !token.isExpired())
                .map(token -> userService.loadUserByUsername(token.username()));
    }
}
