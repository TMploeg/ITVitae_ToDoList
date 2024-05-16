package com.java55.itvitaetodolist.users;

import com.java55.itvitaetodolist.security.AuthDTO;
import com.java55.itvitaetodolist.security.JwtService;
import com.java55.itvitaetodolist.security.TokenDTO;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "${itvitae-todolist.cors}")
public class UserController {
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO) {
        if (authDTO.username() == null || authDTO.password() == null) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "username and password are required"
                    ));
        }

        if (!userService.userExists(authDTO.username())
                || !userService.isCorrectUserPassword(authDTO.username(), authDTO.password())) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "username or password incorrect"
                    ));
        }

        return ResponseEntity.ok(
            new TokenDTO(
                    jwtService.generateTokenForUser(authDTO.username()),
                    authDTO.username()
            )
        );
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody @NotNull AuthDTO authDTO, UriComponentsBuilder ucb) {
        if (authDTO.username() == null || authDTO.password() == null) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "username and password are required"
                    ));
        }

        if (userService.userExists(authDTO.username())
                || !userService.isValidPassword(authDTO.password())) {
            return ResponseEntity
                    .badRequest()
                    .body(ProblemDetail.forStatusAndDetail(
                            HttpStatus.BAD_REQUEST,
                            "username or password is invalid"
                    ));
        }

        User user = userService.save(
            authDTO.username(),
            authDTO.password()
        );

        return ResponseEntity.ok().build();
    }
}
