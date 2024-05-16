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
            validateUsername={validateUsername}
            password={password}
            onPasswordChanged={setPassword}
            validatePassword={validatePassword}
            onSubmit={submit} />
    </div>

    function submit() {
        UserService.login(username, password).then(
            result => {
                if (!result.succes) {
                    alert(result.message.detail);
                    return;
                }

                navigate('/')
            }
        );
    }

    function validateUsername(username) {
        if (username === undefined || username === null || username.length === 0) {
            return ['username is required'];
        }

        return [];
    }

    function validatePassword(password) {
        if (password === undefined || password === null || password.length === 0) {
            return ['password is required'];
        }

        return [];
    }
}