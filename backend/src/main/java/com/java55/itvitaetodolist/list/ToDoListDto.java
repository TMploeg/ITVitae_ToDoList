package com.java55.itvitaetodolist.list;

import com.java55.itvitaetodolist.item.ItemDto;
import com.java55.itvitaetodolist.users.User;
import com.java55.itvitaetodolist.users.UserDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public record ToDoListDto(String name, LocalDateTime created, Long id, List<UserDto> users, List<ItemDto> items) {

    public static ToDoListDto from(ToDoList toDoList){
        var text = toDoList.getName();
        var created = toDoList.getCreated();
        var id = toDoList.getId();
        var users = toDoList.getUsers().stream().map(UserDto::from).toList();
        var itemsList = toDoList.getItems();
        var items = itemsList == null? null : itemsList.stream().map(ItemDto::from).toList();
        return new ToDoListDto(text, created, id, users, items);
    }
}
