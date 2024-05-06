import { useState } from "react";
import "./ToDoForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../../services/ApiService";

export default function ToDoForm({ todos, setTodos, listID }) {
    const [todo, setTodo] = useState({name: "", done: false, order: todos.length, id: 0});
    
    function handleInputChange(event) {
        setTodo({ name: event.target.value, done: false });
    }

    function handleAdd() {
        if (todo.name.length <= 0) {
            return;
        }

        ApiService.post("items", todo).then((todo) => {setTodos([...todos, todo])});
        // empties input 
        setTodo({name: "", done: false, order: todos.length});
    }

    return (
        <>
            <div className="bar">
                <input 
                    onChange={handleInputChange} 
                    value={todo.name} type="text" 
                    placeholder="Add a task" 
                    className="text-input" 
                    spellCheck="false"
                    autoFocus
                />
                <button onClick={handleAdd} type="submit" className="add-button">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </>
    )
}


