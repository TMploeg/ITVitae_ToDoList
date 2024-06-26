package com.java55.itvitaetodolist.item;

import com.java55.itvitaetodolist.exceptions.ForbiddenException;
import com.java55.itvitaetodolist.exceptions.NotFoundException;
import com.java55.itvitaetodolist.list.ToDoList;
import com.java55.itvitaetodolist.list.ToDoListService;
import com.java55.itvitaetodolist.users.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import com.java55.itvitaetodolist.exceptions.BadRequestException;

import java.net.URI;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/items")
@CrossOrigin(origins = "${itvitae-todolist.cors}")
public class ItemController {
    private final ItemRepository itemRepository;
    private final ToDoListService toDoListService;

    @PostMapping
    public ResponseEntity<ItemDto> addItem(@RequestBody PostItemDto postItemDto, UriComponentsBuilder ucb, Authentication authentiction) {
        User user = (User)authentiction.getPrincipal();

        if (postItemDto.listId() == null) throw new BadRequestException("ListId is required!");
        Optional<ToDoList> possiblyExistingList = toDoListService.findById(postItemDto.listId());
        if (possiblyExistingList.isEmpty()) {
            throw new NotFoundException();
        }
        ToDoList list = possiblyExistingList.get();

        if (!list.hasUser(user)) {
            throw new ForbiddenException();
        }

        if (postItemDto.order() == null) {
            throw new BadRequestException("Order can't be null");
        }
        if (postItemDto.text() == null) {
            throw new BadRequestException("Text can't be null");
        }

        Item newItem = itemRepository.save(new Item(list, postItemDto.text(), postItemDto.order()));
        URI locationOfNewItem = ucb.path("items/{id}").buildAndExpand(newItem.getItemId()).toUri();
        return ResponseEntity.created(locationOfNewItem).body(ItemDto.from(newItem));
    }

    @PatchMapping("/{id}")
    public ItemDto updateItem(@PathVariable Long id, @RequestBody PatchItemDto patchItemDto, Authentication authentication) {
        User user = (User)authentication.getPrincipal();

        var possiblyExistingItem = itemRepository.findById(id);
        if (possiblyExistingItem.isEmpty()) {
            throw new NotFoundException();
        }
        Item item = possiblyExistingItem.get();

        if (!item.getList().hasUser(user)) {
            throw new ForbiddenException();
        }

        if (patchItemDto.completed() != null) {
            item.setCompleted(patchItemDto.completed());
        }
        if (patchItemDto.order() != null) {
            item.setOrder(patchItemDto.order());
        }
        if (patchItemDto.text() != null) {
            item.setText(patchItemDto.text());
        }
        itemRepository.save(item);

        return ItemDto.from(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id, Authentication authentication) {
        User user = (User)authentication.getPrincipal();

        var optionalItem = itemRepository.findById(id);
        if (optionalItem.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Item item = optionalItem.get();
        if (!item.getList().hasUser(user)) {
            throw new ForbiddenException();
        }
        
        item.setEnabled(false);
        itemRepository.save(item);
        return ResponseEntity.noContent().build();
    }
}
