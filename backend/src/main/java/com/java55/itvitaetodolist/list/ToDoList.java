package com.java55.itvitaetodolist.list;

import com.java55.itvitaetodolist.item.Item;
import com.java55.itvitaetodolist.users.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class ToDoList {

    public ToDoList(String name, User creator){
        this.name = name;
        created = LocalDateTime.now();
        users = Set.of(creator);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDateTime created;

    @ManyToMany
    private Set<User> users;

    @OneToMany(mappedBy = "list")
    private Set<Item> items;

    private boolean enabled = true;

    public boolean hasUser(User user){
        return users.contains(user);
    }

    public void addUser(User user){
        users.add(user);
    }

    public void removeUser(User user){
        users.remove(user);
    }
}
