import React, { useState } from 'react';
import Task from '../task/Task';
import Title from '../title/Title';
import TodoForm from '../todoform/ToDoForm';
import './ToDoList.css';
import { Reorder } from "framer-motion"

export default function Boodschappenlijstje({}) {
    const [todos, setTodos] = useState([]);
    const sortedTodos = todos.slice().sort((a,b) => Number(a.done) - Number(b.done));

    return (
        <div className="todo-list">
            <Title />
            <TodoForm todos={todos} setTodos={setTodos} />
            
            <Reorder.Group axis="y" values={sortedTodos} onReorder={setTodos}>
                {sortedTodos.map(todo => (
                    <Reorder.Item key={todo.name} value={todo}>
                        <Task todo={todo} todos = {todos} setTodos={setTodos} />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}
