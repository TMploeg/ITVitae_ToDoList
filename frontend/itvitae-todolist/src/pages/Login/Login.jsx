import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth-form";
import UserService from "../../services/UserService.js";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return <div className="form-container">
        <AuthForm
            title="Login"
            username={username}
            onUsernameChanged={setUsername}
            password={password}
            onPasswordChanged={setPassword}
            onSubmit={submit} />
    </div>

    function submit() {
        UserService.login(username, password).then(
            result => {
                if (!result.succes) {
                    alert(result.message);
                    return;
                }

                navigate('/')
            }
        );
    }
}