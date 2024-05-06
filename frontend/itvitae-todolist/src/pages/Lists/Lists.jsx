import List_Row from "../../components/List_Row/List_Row";
import "./Lists.css";
import ApiService from "../../services/ApiService";
import { useState } from "react";
import { useEffect } from "react";

export default function Lists() {
    const [lists, setLists] = useState([]);
    
    useEffect(createLists, []);

    function createLists(){
        ApiService.get("lists").then(response => setLists(response.body));
    }

    return (
        <div className="lists">
            <h1>Your Lists</h1>
            {lists.map((list, index) => <List_Row key={index} text={list.name} />)}
        </div>
    );
}