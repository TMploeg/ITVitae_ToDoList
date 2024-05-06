package com.java55.itvitaetodolist.list;

import java.time.LocalDateTime;

public record ToDoListDto(String name, LocalDateTime created, Long id) {

    public static ToDoListDto from(ToDoList toDoList){
        var text = toDoList.getName();
        var created = toDoList.getCreated();
        var id = toDoList.getId();
        return new ToDoListDto(text, created, id);
    }


}
