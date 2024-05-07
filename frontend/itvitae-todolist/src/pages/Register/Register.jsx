import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth-form";
import UserService from "../../services/UserService";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return <div className="form-container">
        <AuthForm
            title="Register"
            username={username}
            onUsernameChanged={setUsername}
            password={password}
            onPasswordChanged={setPassword}
            onSubmit={submit} />
    </div>

    function submit() {
        UserService.register(username, password).then(
            registerResult => {
                if (!registerResult.succes) {
                    alert(registerResult.message);
                    return;
                }

                UserService.login(username, password).then(
                    loginResult => navigate(loginResult.succes ? '/' : '/login')
                );
            }
        );
    }
}