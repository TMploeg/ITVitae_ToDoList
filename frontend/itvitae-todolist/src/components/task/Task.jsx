import React, { useState } from "react";
import './Task.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareXmark} from '@fortawesome/free-solid-svg-icons';

export default function Task({ todo, todos, setTodos }) {
    const [editedText, setEditedText] = useState(todo.name);
    const [isEditing, setIsEditing] = useState(false);

    function handleDelete(todo) {
        const updatedTodos = todos.filter((item) => item !== todo); 
        setTodos(updatedTodos);
    }

    function handleCheckOff(name) {
        const newArray = todos.map((todo) => todo.name === name ? {...todo,done:!todo.done} : todo);
        setTodos(newArray);
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function handleInputChange(event) {
        setEditedText(event.target.value);
    }

    function handleSave() {
        const updatedTodos = todos.map(item =>
            item === todo ? { ...item, name: editedText } : item
        );
        setTodos(updatedTodos);
        setIsEditing(false);
    }

    return (
        <div className="task">
            <div className="checkbox-and-text">
                <span>
                    <input type="checkbox" className="check-off-box" checked={todo.done} onChange={() => handleCheckOff(todo.name)} />
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

