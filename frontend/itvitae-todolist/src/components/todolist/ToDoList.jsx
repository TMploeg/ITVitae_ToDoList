import React, { useState } from 'react';
import Task from '../task/Task';
import Title from '../title/Title';
import TodoForm from '../todoform/ToDoForm';
import './ToDoList.css';
import { Reorder } from "framer-motion"
import { useParams } from 'react-router-dom';
import ApiService from "../../services/ApiService";

export default function Boodschappenlijstje({}) {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);
    const sortedTodos = todos.slice().sort((a,b) => Number(a.order) - Number(b.order));

    function handleReorder(newTodos) {
        newTodos.array.forEach((todo, index) => {
            todo.order = index;
            ApiService.patch("items/" + todo.id, todo);
        });

        setTodos(newTodos);
    }

    return (
        <div className="todo-list">
            <Title />
            <TodoForm todos={todos} setTodos={setTodos} listID={id} />
            
            <Reorder.Group axis="y" values={sortedTodos} onReorder={handleReorder}>
                {sortedTodos.map(todo => (
                    <Reorder.Item key={todo.id} value={todo}>
                        <Task todo={todo} todos = {todos} setTodos={setTodos} listID={id} />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}
