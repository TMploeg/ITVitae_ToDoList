import { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../services/ApiService";
import "./UserList.css";

export default function UsersList({ users, setUsers, listid }){
    const [usernames, setUsernames] = useState([]);
    const [newUsername, setNewUsername] = useState("");

    useEffect(() => {
        var allUsernames = users.map((user) => {
            return  user.username;
        });
        setUsernames(allUsernames);
    }, [users]);

    function handleAdd(){
        ApiService.post("lists/" + listid + "/users", {username: newUsername}).then(
            (response) => {
                setNewUsername("");
                let newUsers = response.body.users.map((user) => {
                    return {
                        id: user.id,
                        username: user.username
                    }}
                );
                setUsers(newUsers);
            },
            error => alert(error.message.detail)
        );
    }
    function handleRemove(removedUser){
        ApiService.delete("lists/" + listid + "/users/" + removedUser).then(
            (response) => {
                let newUsers = response.body.users.map((user) => {
                    return {
                        id: user.id,
                        username: user.username
                    }
                });
                setUsers(newUsers);
            },
            error => alert(error.message.detail)
        );
    }

    function handleInputChange(event){
        setNewUsername( event.target.value );

    }
    return (
        <div className="users-list">
            <div className="users-add">
                <input
                    onChange={handleInputChange} 
                    
                    onKeyDown={e => e.key === `Enter`? handleAdd() : ''}
                    value={newUsername} type="text" 
                    placeholder="Add a user" 
                    className="users-text-input" 
                    spellCheck="false"
                    autoFocus
                />
                <button onClick={handleAdd} type="submit" className="users-add-button">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div>
                {usernames.map((username) => <UserRow username={username} key={username} removeUser={handleRemove}/>)}
            </div>
        </div>
    );
}