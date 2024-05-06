package com.java55.itvitaetodolist;

import com.java55.itvitaetodolist.security.AuthDTO;
import com.java55.itvitaetodolist.security.TokenDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {
    @PostMapping("login")
    public ResponseEntity<TokenDTO> login(@RequestBody AuthDTO authDTO){
        return ResponseEntity.ok().build();
    }
}
