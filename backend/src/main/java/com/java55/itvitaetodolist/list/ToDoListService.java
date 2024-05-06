package com.java55.itvitaetodolist.list;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ToDoListService {

    private final ToDoListRepository toDoListRepository;

    public Optional<ToDoList> findById(long id){
        return toDoListRepository.findById(id);
    }

    public List<ToDoList> findAll(){
        return toDoListRepository.findAll();
    }

    public ToDoList save(ToDoList newList){
        return toDoListRepository.save(newList);
    }
}
