import { useState } from "react";
import "./ToDoForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

export default function ToDoForm({ todos, setTodos }) {
    const [todo, setTodo] = useState({name: "", done: false});
    
    function handleInputChange(event) {
        setTodo({ name: event.target.value, done: false });
    }

    function handleAdd() {
        if (todo.name.length > 0) {
            setTodos([...todos, todo]);
            setTodo({name: "", done: false});
        }
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


