package com.java55.itvitaetodolist.list;

import com.java55.itvitaetodolist.users.User;
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
@CrossOrigin
public class ToDoListController {

    private final ToDoListService toDoListService;

    @GetMapping
    public List<ToDoList> getAll(Authentication authentication){
        var user = (User) authentication.getPrincipal();

        return toDoListService.findByUsername(user.getUsername()).stream().toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDoListDto> get(@PathVariable long id){
        var possibleList = toDoListService.findById(id);
        if(possibleList.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ToDoListDto.from(possibleList.get()));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ToDoListCreationDto newList, UriComponentsBuilder ucb){
        String text = newList.name();
        if(text.isBlank()){
            return ResponseEntity.badRequest().body("The name needs text");
        }
        var user = newList.user();
        if(user == null) {
            return ResponseEntity.badRequest().body("a new list needs a user");
        }
        var newToDoList = new ToDoList(text);
        toDoListService.save(newToDoList);

        URI location = ucb.path("/lists/{id}").buildAndExpand(newToDoList.getId()).toUri();
        return ResponseEntity.created(location).body(ToDoListDto.from(newToDoList));
    }

    @PatchMapping("{id}")
    public ResponseEntity<?> update(@RequestBody ToDoListPatchDto toDoListPatchDto){
        var idFromBody = toDoListPatchDto.id();
        if(idFromBody == null){
            return ResponseEntity.badRequest().body("PATCH needs id in body");
        }

        var possibleOriginal = toDoListService.findById(idFromBody);
        if(possibleOriginal.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        var originalToDoList = possibleOriginal.get();

        if(toDoListPatchDto.name() != null){
            originalToDoList.setName(toDoListPatchDto.name());
        }

        toDoListService.save(originalToDoList);

        return ResponseEntity.ok(ToDoListDto.from(originalToDoList));
    }

    @PostMapping("{id}/{username}")
    public ResponseEntity<ToDoListDto> addUser(@PathVariable Long id, @PathVariable String username){
        var possibleList = toDoListService.findById(id);
        if(possibleList.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        var list = possibleList.get();

        toDoListService.addUser(list, username);

        return ResponseEntity.ok(ToDoListDto.from(list));
    }

    @DeleteMapping("{id}/{username}")
    public ResponseEntity<ToDoListDto> removeUser(@PathVariable Long id, @PathVariable String username){
        var possibleList = toDoListService.findById(id);
        if(possibleList.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        var list = possibleList.get();

        toDoListService.removeUser(list, username);

        return ResponseEntity.ok(ToDoListDto.from(list));
    }
}
