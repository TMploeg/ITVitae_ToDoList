import "./ListRow.css";
import '@fortawesome/fontawesome-free/css/all.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import Title from "../todolist/title/Title";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

import React from "react";

export default function List_Row({ ownList, updateLists }) {
    const navigate = useNavigate();
    const [text, setText] = useState(ownList.name);
    let created = new Date(ownList.created);

    function gotoList(listId) {
        navigate("/lists/" + listId);
    }

    function handleDelete(listId) {
        ApiService.delete("lists/" + listId).then(() => updateLists());
    }

    return (
        <div className="row-container" onClick={() => gotoList(ownList.id)}>
            <div className="row" >
                <Title title={text} listID={ownList.id} setTitle={setText} />
                <button onClick={(e) => { e.stopPropagation(); handleDelete(ownList.id) }} className="delete-button">
                    <FontAwesomeIcon icon={faSquareXmark} />
                </button>

            </div>
            <p>created on: {created.toLocaleDateString()}</p>
        </div>
    );
}
