package com.java55.itvitaetodolist.list;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public List<ToDoList> getAll(){
        return toDoListService.findAll();
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
            return ResponseEntity.badRequest().body("The title needs name");
        }
        var users = newList.users();
        if(users.isEmpty()) {
            return ResponseEntity.badRequest().body("a new list needs at least 1 user");
        }
        var newToDoList = new ToDoList(text, users);
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
        if(toDoListPatchDto.users() != null){
            originalToDoList.setUsers(toDoListPatchDto.users());
        }
        toDoListService.save(originalToDoList);

        return ResponseEntity.ok(ToDoListDto.from(originalToDoList));
    }
}
