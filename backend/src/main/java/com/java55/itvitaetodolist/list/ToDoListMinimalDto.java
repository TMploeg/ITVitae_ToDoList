package com.java55.itvitaetodolist.list;

import java.time.LocalDateTime;

public record ToDoListMinimalDto(String name, LocalDateTime created, Long id) {

    public static ToDoListMinimalDto from(ToDoList toDoList){
        var text = toDoList.getName();
        var created = toDoList.getCreated();
        var id = toDoList.getId();
        return new ToDoListMinimalDto(text, created, id);
    }
}
