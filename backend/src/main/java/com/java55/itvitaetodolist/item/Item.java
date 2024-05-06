package com.java55.itvitaetodolist.item;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long itemId;

    @ManyToOne
    @JoinColumn (name="todolist_id")
    private ToDoList list;
    private String text;
    private int order;
    private boolean completed = false;
    private boolean enabled = true;

    public Item(ToDoList list, String text, int order) {
        this.list = list;
        this.text = text;
        this.order = order;
    }
}
