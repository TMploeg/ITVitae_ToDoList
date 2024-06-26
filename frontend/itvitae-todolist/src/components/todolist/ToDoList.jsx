import { Reorder } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import './ToDoList.css';
import Task from './task/Task';
import Title from './title/Title';
import TodoForm from './todoform/ToDoForm';
import UsersList from "../userslist";

export default function ToDoList() {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);

    const [title, setTitle] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

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
            });
            let newUsers = response.body.users.map((user) => {
                return {
                    id: user.id,
                    username: user.username
                }
            });

            setUsers(newUsers);
            setTodos(newTodos);
        }, error => navigate("/lists"))
    }, []);


    return (
        <div className="todo-page">
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
            <UsersList users= {users} setUsers={setUsers} listid={id}/>
        </div>
    );
}
