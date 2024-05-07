package com.java55.itvitaetodolist.item;

import com.java55.itvitaetodolist.list.ToDoList;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Where(clause = "enabled = true")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long itemId;

    @ManyToOne
    private ToDoList list;
    private String text;
    @Column(name = "item_order")
    private int order;
    private boolean completed = false;
    private boolean enabled = true;

    public Item(ToDoList list, String text, int order) {
        this.list = list;
        this.text = text;
        this.order = order;
    }
}
