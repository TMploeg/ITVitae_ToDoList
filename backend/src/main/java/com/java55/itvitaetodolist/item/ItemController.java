package com.java55.itvitaetodolist.item;

import com.java55.itvitaetodolist.exceptions.NotFoundException;
import com.java55.itvitaetodolist.list.ToDoList;
import com.java55.itvitaetodolist.list.ToDoListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import com.java55.itvitaetodolist.exceptions.BadRequestException;

import java.net.URI;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemRepository itemRepository;
    private final ToDoListRepository toDoListRepository;

    @PostMapping
    public ResponseEntity<Item> addItem(@RequestBody PostItemDto postItemDto, UriComponentsBuilder ucb) {
        Optional<ToDoList> possiblyExistingList = toDoListRepository.findById(postItemDto.listId());
        if (possiblyExistingList.isEmpty()) {
            throw new NotFoundException();
        }
        ToDoList list = possiblyExistingList.get();

        if (postItemDto.order() == null) {
            throw new BadRequestException("Order can't be null");
        }
        if (postItemDto.text() == null) {
            throw new BadRequestException("Text can't be null");
        }

        Item newItem = itemRepository.save(new Item(list, postItemDto.text(), postItemDto.order()));
        URI locationOfNewItem = ucb.path("items/{id}").buildAndExpand(newItem.getItemId()).toUri();
        return ResponseEntity.created(locationOfNewItem).body(newItem);
    }

    @PatchMapping("/{id}")
    public ItemDto updateItem(@PathVariable Long id, @RequestBody PatchItemDto patchItemDto) {
        var possiblyExistingItem = itemRepository.findById(id);
        if (possiblyExistingItem.isEmpty()) {
            throw new NotFoundException();
        }
        Item item = possiblyExistingItem.get();

        if (patchItemDto.completed() != null) {
            item.setCompleted(true);
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
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        var optionalItem = itemRepository.findById(id);
        if (optionalItem.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Item item = optionalItem.get();
        item.setEnabled(false);
        return ResponseEntity.noContent().build();
    }
}
