import "./ListRow.css";
import '@fortawesome/fontawesome-free/css/all.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import Title from "../todolist/title/Title";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React from "react";

export default function List_Row({ownList}){
    const navigate = useNavigate();
    const [text, setText] = useState(ownList.name);
    let created = new Date(ownList.created);

    function gotoList(event, listId){
        navigate("/lists/" + listId);
    }

    return (
        <div className="row" onClick={ (event) => gotoList(event, ownList.id)}>
            <Title title={text} listID={ownList.id} setTitle={setText}/>
            <p>created on: {created.toISOString()}</p>
        </div>
    );
}