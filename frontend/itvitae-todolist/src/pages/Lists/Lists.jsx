import List_Row from "../../components/List_Row/List_Row";
import "./Lists.css";

export default function Lists() {
    //fetch lists
    //for each create a List_Row
    //return all
    return (
        <div className="lists">
            <h1>Your Lists</h1>
            <List_Row text="1"/>
            <List_Row text="2"/>
        </div>
    );
}