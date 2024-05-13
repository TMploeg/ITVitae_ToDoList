import { useState } from "react";
import "./ToDoForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../../services/ApiService";

export default function ToDoForm({ todos, setTodos, listID }) {
    const [todo, setTodo] = useState({name: ""});
    
    function handleInputChange(event) {
        setTodo({...todo, name: event.target.value });
    }

    function handleAdd() {
        if (todo.name.length <= 0 || todo.name.trim().length <= 0) {
            return;
        }

        ApiService.post("items", {listId: listID, text: todo.name, order: todos.length}).then((response) => {setTodos([...todos, responseToItem(response.body)])});
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


function responseToItem(entity){
    return {
        id: entity.id,
        name: entity.text,
        done: entity.completed,
        order: entity.order
    };
}

