import List_Row from "../../components/List_Row/List_Row";
import "./Lists.css";
import ApiService from "../../services/ApiService";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Lists() {
    const [lists, setLists] = useState([]);
    const [listTitle, setListTitle] = useState("");

    useEffect(createLists, []);

    function createLists() {
        ApiService.get("lists").then(response => {
            let arrayFromBody = response.body;
            console.log(arrayFromBody);
            arrayFromBody.sort((a, b) => (a.created > b.created));
            setLists(arrayFromBody);
        });
    }

    function addList() {
        if (listTitle != null && listTitle.trim() !== "") {
            let returnBody = { name: listTitle };
            ApiService.post("lists", returnBody).then(() => createLists());
        }
        setListTitle("");
    }

    function handleInputChange(event) {
        setListTitle(event.target.value);
    }


    return (
        <div className="lists">
            <span className="topTitle">Your Lists</span>
            <div className="lists-bar">
                <input
                    onChange={handleInputChange}
                    onKeyDown={e => e.key === `Enter`? addList() : ''}
                    value={listTitle} type="text"
                    placeholder="Enter the title of your new to do list"
                    className="lists-text-input"
                    spellCheck="false"
                    autoFocus
                />
                <button onClick={addList} type="submit" className="add-new-button">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            {lists.map((list) => <List_Row key={list.id} ownList={list} updateLists={createLists}/>)}
        </div>
    );
}