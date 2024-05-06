package com.java55.itvitaetodolist;

import com.java55.itvitaetodolist.security.JwtService;
import com.java55.itvitaetodolist.users.User;
import com.java55.itvitaetodolist.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    private final UserService userService;
    private final JwtService jwtService;

    @Override
    public void run(String[] args){
        User testUser = userService.save("test", "test");
        System.out.println(jwtService.generateTokenForUser("test"));
    }

}
