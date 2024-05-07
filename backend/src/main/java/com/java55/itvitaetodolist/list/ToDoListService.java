package com.java55.itvitaetodolist.list;

import com.java55.itvitaetodolist.users.User;
import com.java55.itvitaetodolist.users.UserRepository;
import com.java55.itvitaetodolist.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ToDoListService {

    private final ToDoListRepository toDoListRepository;
    private final UserService userService;

    public Optional<ToDoList> findById(long id){
        return toDoListRepository.findById(id);
    }

    public List<ToDoList> findAll(){
        return toDoListRepository.findAll();
    }

    public ToDoList save(ToDoList newList){
        return toDoListRepository.save(newList);
    }

    public void addUser(ToDoList list, String username) {
        var user = userService.loadUserByUsername(username);
        if(list.hasUser(user)){
            throw new RuntimeException("user already present");
        }
        list.addUser(user);
    }

    public void removeUser(ToDoList list, String username){
        var user = userService.loadUserByUsername(username);
        if(!list.hasUser(user)){
            throw new RuntimeException("user not present");
        }
        list.removeUser(user);
    }

    public Set<ToDoList> findByUsername(String username){
        return toDoListRepository.findByUsers_Username(username);
    }
}
