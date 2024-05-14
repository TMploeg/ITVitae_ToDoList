import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareXmark} from '@fortawesome/free-solid-svg-icons';

export default function UserRow({username, removeUser}){
    return (
        <div className="user-row">
            <div>{username}</div>
            <button onClick={() => removeUser(username)} className="users-delete-button">
                <FontAwesomeIcon icon={faSquareXmark} />
            </button>
        </div>
    );
}