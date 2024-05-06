package com.java55.itvitaetodolist.list;

import com.java55.itvitaetodolist.users.User;

import java.time.LocalDateTime;
import java.util.List;

public record ToDoListDto(String name, LocalDateTime created, Long id, List<User> users) {

    public static ToDoListDto from(ToDoList toDoList){
        var text = toDoList.getName();
        var created = toDoList.getCreated();
        var id = toDoList.getId();
        var users = toDoList.getUsers().stream().toList();
        return new ToDoListDto(text, created, id, users);
    }


}
