import React, { useState } from "react";
import './Title.css';

export default function Title({ title }) {
    const [editedText, setEditedText] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(true);
    }

    function handleInputChange(event) {
        setEditedText(event.target.value);
    }

    function handleSave() {
        setIsEditing(false);
    }

    return (
        <span>
            {isEditing ? (
                <input
                    className="edit-title" 
                    type="text"
                    value={editedText}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                    spellCheck="false"
                    autoFocus 
                    />
                ) : (
                        <h1 onClick={handleEdit}>{editedText}</h1>
                    )}
        </span>
    );
}