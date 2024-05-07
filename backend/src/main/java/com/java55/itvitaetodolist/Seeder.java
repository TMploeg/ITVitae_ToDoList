package com.java55.itvitaetodolist;

import com.java55.itvitaetodolist.item.Item;
import com.java55.itvitaetodolist.item.ItemRepository;
import com.java55.itvitaetodolist.list.ToDoList;
import com.java55.itvitaetodolist.list.ToDoListRepository;
import com.java55.itvitaetodolist.list.ToDoListService;
import com.java55.itvitaetodolist.security.JwtService;
import com.java55.itvitaetodolist.users.User;
import com.java55.itvitaetodolist.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    private final UserService userService;
    private final JwtService jwtService;
    private final ToDoListService toDoListService;
    private final ItemRepository itemRepository;

    @Override
    public void run(String[] args){
        User testUser = userService.userExists("test") ?
                userService.loadUserByUsername("test") :
                userService.save("test", "test");

        if (toDoListService.findByUsername("test").isEmpty()){
            ToDoList list1 = new ToDoList("Test", testUser);
            list1 = toDoListService.save(list1);
            List<Item> list1items = List.of(
                    new Item(list1, "Dit is een test", 0),
                    new Item(list1, "Mmmmhhh", 1),
                    new Item(list1, "Werkt dit?", 2)
            );
            itemRepository.saveAll(list1items);

            ToDoList list2 = new ToDoList("Test2", testUser);
            list2 = toDoListService.save(list2);
            List<Item> list2items = List.of(
                    new Item(list2, "Is dit een test?", 2),
                    new Item(list2, "Test", 0),
                    new Item(list2, "lorum ipsum", 1)
            );
            itemRepository.saveAll(list2items);
        }
    }

}
