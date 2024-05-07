import React, { useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import './Title.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiService from "../../../services/ApiService";

export default function Title({ listID }) {
    const [editedText, setEditedText] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    function handleEdit() {
        setIsEditing(true);
    }

    function handleInputChange(event) {
        setEditedText(event.target.value);
    }

    function handleSave() {
        setIsEditing(false);
        ApiService.patch("lists/" + listID, {name: editedText});
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
                    <span className="title-container">
                        <h1 onClick={handleEdit}>{editedText || "To Do"}</h1>
                        <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={handleEdit} />
                    </span>
                    )}
        </span>
    );
}