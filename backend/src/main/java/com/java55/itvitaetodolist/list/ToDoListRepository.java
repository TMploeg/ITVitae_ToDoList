package com.java55.itvitaetodolist.list;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ToDoListRepository extends JpaRepository<ToDoList, Long> {
    Set<ToDoList> findByUsers_Username(String username);
}
