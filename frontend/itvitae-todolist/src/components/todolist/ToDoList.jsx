import { Reorder } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from "../../services/ApiService";
import './ToDoList.css';
import Task from './task/Task';
import Title from './title/Title';
import TodoForm from './todoform/ToDoForm';

export default function ToDoList() {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const sortedTodos = todos.slice().sort((a, b) => Number(a.order) - Number(b.order));

    function handleReorder(newTodos) {
        newTodos.forEach((todo, index) => {
            todo.order = index;
            ApiService.patch("items/" + todo.id, todo);
        });

        setTodos(newTodos);
    }

    useEffect(() => {
        ApiService.get("lists/" + id).then((response) => {
            if (response.body.name !== null) {
                setTitle(response.body.name);
            }
            let newTodos = response.body.items.map((todo) => {
                return {
                    id: todo.id,
                    name: todo.text,
                    done: todo.completed,
                    order: todo.order
                }
            })
            setTodos(newTodos);
        })
    }, []);


    return (
        <div className="todo-list">
            <Title title={title} listID={id} setTitle={setTitle} />
            <TodoForm todos={todos} setTodos={setTodos} listID={id} />

            <Reorder.Group axis="y" values={sortedTodos} onReorder={handleReorder}>
                {sortedTodos.map(todo => (
                    <Reorder.Item key={todo.id} value={todo}>
                        <Task todo={todo} todos={todos} setTodos={setTodos} listID={id} />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}
