package com.java55.itvitaetodolist.item;

public record ItemDto(Long id, Long listId, String text, Integer order, Boolean completed) {
    public static ItemDto from(Item item) {
        return new ItemDto(item.getItemId(), item.getList().getId(), item.getText(), item.getOrder(), item.isCompleted());
    }
}
