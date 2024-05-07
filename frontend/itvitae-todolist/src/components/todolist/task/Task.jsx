import React, { useState } from "react";
import './Task.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareXmark} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../../services/ApiService";

export default function Task({ todo, todos, setTodos, listID }) {
    const [editedText, setEditedText] = useState(todo.name);
    const [isEditing, setIsEditing] = useState(false);

    function handleDelete(todo) {
        ApiService.delete("items/" + todo.id);
        const updatedTodos = todos.filter((item) => item !== todo); 
        setTodos(updatedTodos);
    }

    function handleCheckOff(id) {
        const newArray = todos.map((todo) => { 
            if (todo.id !== id) return todo;
            
            let checked = !todo.done;

            ApiService.patch("items/" + todo.id, {completed: checked});

            return {...todo,done: checked};
        });
        setTodos(newArray);
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function handleInputChange(event) {
        setEditedText(event.target.value);
    }

    function handleSave() {
        const updatedTodos = todos.map(item => {
            if (item !== todo) return item;

            ApiService.patch("items/" + todo.id, { text: editedText });

            return { ...todo, name: editedText };
        }
        );
        setTodos(updatedTodos);
        setIsEditing(false);
    }

    return (
        <div className="task">
            <div className="checkbox-and-text">
                <span>
                    <input type="checkbox" className="check-off-box" checked={todo.done} onChange={() => handleCheckOff(todo.id)} />
                </span>
                <span>
                    {isEditing ? (
                        <input
                            className="edit-input" 
                            type="text"
                            value={editedText}
                            onChange={handleInputChange}
                            onBlur={handleSave}
                            spellCheck="false"
                            autoFocus 
                        />
                    ) : (
                      // if task is done, strikethrough text
                    <span className={todo.done ? 'completed item-name' : 'item-name'} onClick={handleEdit}>
                        {todo.name}
                    </span>
                )}
                </span>
            </div>
            
            <span>
                <button onClick={() => handleDelete(todo)} className="delete-button">
                    <FontAwesomeIcon icon={faSquareXmark} />
                </button>
            </span>
        </div>
    );
};

