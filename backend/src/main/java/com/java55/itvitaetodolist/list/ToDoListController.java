package com.java55.itvitaetodolist.list;

import com.java55.itvitaetodolist.exceptions.BadRequestException;
import com.java55.itvitaetodolist.exceptions.NotFoundException;
import com.java55.itvitaetodolist.users.User;
import com.java55.itvitaetodolist.users.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("lists")
@CrossOrigin(origins = "${itvitae-todolist.cors}")
public class ToDoListController {

    private final ToDoListService toDoListService;

    @GetMapping
    public List<ToDoListMinimalDto> getAll(Authentication authentication){
        var user = (User) authentication.getPrincipal();

        return toDoListService.findByUsername(user.getUsername()).stream().map(ToDoListMinimalDto::from).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDoListDto> get(@PathVariable long id, Authentication authentication){
        var possibleList = toDoListService.findById(id);
        if(possibleList.isEmpty()){
            throw new NotFoundException();
        }
        User currentUser = (User) authentication.getPrincipal();
        var foundList = possibleList.get();

        if(!foundList.hasUser(currentUser)){
            throw new NotFoundException();
        }
        return ResponseEntity.ok(ToDoListDto.from(foundList));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ToDoListCreationDto newList, UriComponentsBuilder ucb, Authentication authentication){
        String text = newList.name();
        if(text.isBlank()){
            throw new BadRequestException("The name needs text");
        }
        var user = (User) authentication.getPrincipal();

        var newToDoList = new ToDoList(text, user);
        toDoListService.save(newToDoList);

        URI location = ucb.path("/lists/{id}").buildAndExpand(newToDoList.getId()).toUri();
        return ResponseEntity.created(location).body(ToDoListDto.from(newToDoList));
    }

    @PatchMapping("{id}")
    public ResponseEntity<?> update(@RequestBody ToDoListPatchDto toDoListPatchDto, @PathVariable Long id, Authentication authentication){
        var idFromBody = toDoListPatchDto.id();
        if(idFromBody != null){
            throw new BadRequestException("PATCH should not have id in body");
        }

        var possibleOriginal = toDoListService.findById(id);
        if(possibleOriginal.isEmpty()){
            throw new NotFoundException();
        }
        var originalToDoList = possibleOriginal.get();

        var currentUser = (User) authentication.getPrincipal();

        if(!originalToDoList.hasUser(currentUser)){
            throw new NotFoundException();
        }

        if(toDoListPatchDto.name() != null){
            originalToDoList.setName(toDoListPatchDto.name());
        }

        toDoListService.save(originalToDoList);

        return ResponseEntity.ok(ToDoListDto.from(originalToDoList));
    }

    @PostMapping("{id}/users")
    public ResponseEntity<ToDoListDto> addUser(@PathVariable Long id, @RequestBody UserDto newUser, Authentication authentication){
        var possibleList = toDoListService.findById(id);
        if(possibleList.isEmpty()){
            throw new NotFoundException();
        }
        var list = possibleList.get();
        var currentUser = (User) authentication.getPrincipal();

        if(!list.hasUser(currentUser)){
            throw new NotFoundException();
        }

        if(newUser.username() == null || newUser.username().isBlank()){
            throw new BadRequestException("username can't be empty");
        }
        var username = newUser.username();

        toDoListService.addUser(list, username);

        return ResponseEntity.ok(ToDoListDto.from(list));
    }

    @DeleteMapping("{id}/users/{username}")
    public ResponseEntity<ToDoListDto> removeUser(@PathVariable Long id, @PathVariable String username, Authentication authentication){
        var possibleList = toDoListService.findById(id);
        if(possibleList.isEmpty()){
            throw new NotFoundException();
        }
        var list = possibleList.get();

        var currentUser = (User) authentication.getPrincipal();

        if(!list.hasUser(currentUser)){
            throw new NotFoundException();
        }

        toDoListService.removeUser(list, username);

        return ResponseEntity.ok(ToDoListDto.from(list));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteList(@PathVariable long id, Authentication authentication){
        var possibleList = toDoListService.findById(id);
        if(possibleList.isEmpty()){
            throw new NotFoundException();
        }
        var listToDelete = possibleList.get();

        var currentUser = (User) authentication.getPrincipal();

        if(!listToDelete.hasUser(currentUser)){
            throw new NotFoundException();
        }
        listToDelete.setEnabled(false);
        toDoListService.save(listToDelete);

        return ResponseEntity.noContent().build();
    }

}
