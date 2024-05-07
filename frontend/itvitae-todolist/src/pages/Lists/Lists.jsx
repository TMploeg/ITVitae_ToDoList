import List_Row from "../../components/List_Row/List_Row";
import "./Lists.css";
import ApiService from "../../services/ApiService";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Lists() {
    const [lists, setLists] = useState([]);
    
    useEffect(createLists, []);

    function createLists(){
        ApiService.get("lists").then(response => {
            let arrayFromBody = response.body;
            console.log(arrayFromBody);
            arrayFromBody.sort((a, b) => (a.created > b.created));
            setLists(arrayFromBody);
        });
    }

    function addList(){
        let listTitle = prompt("please enter the title of your new to do list:");
        if(listTitle == null || listTitle.trim() === ""){
            alert("Title can not be empty");
        } else {
            let returnBody = { name: listTitle };
            ApiService.post("lists", returnBody).then(() => createLists());
        }
    }

    return (
        <div className="lists">
            <div className="head">
                <h1 className="topTitle">Your Lists</h1>
                <button className="addNewButton" onClick={addList}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
            {lists.map((list) => <List_Row key={list.id} ownList={list}/>)}
        </div>
    );
}