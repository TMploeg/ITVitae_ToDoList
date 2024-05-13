import React, { useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import './Title.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiService from "../../../services/ApiService";

export default function Title({ title, listID, setTitle }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(true);
    }

    function handleInputChange(event) {
        setTitle(event.target.value);
    }

    function handleSave() {
        setIsEditing(false);
        ApiService.patch("lists/" + listID, {name: title});
    }

    return (
        <span>
            {isEditing ? (
                <input
                    className="edit-title" 
                    type="text"
                    value={title}
                    onChange={handleInputChange}
                    onClick={(e) => {e.stopPropagation();}}
                    onBlur={handleSave}
                    onKeyDown={e => e.key === `Enter`? handleSave() : ''}
                    spellCheck="false"
                    autoFocus 
                    />
                ) : (
                    <span className="title-container">
                        <h1 className="list-title">{title}</h1>
                        <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={(e) => {e.stopPropagation(); handleEdit();}} />
                    </span>
                    )}
        </span>
    );
}