package com.java55.itvitaetodolist.users;

import java.util.UUID;

public record UserDto(UUID id, String username) {
    public static UserDto from(User user){
        UUID id = user.getId();
        String username = user.getUsername();
        return new UserDto(id, username);
    }
}
