import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth-form";
import UserService from "../../services/UserService";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return <AuthForm
            title="Register"
            username={username}
            onUsernameChanged={setUsername}
            validateUsername={validateUsername}
            password={password}
            onPasswordChanged={setPassword}
            validatePassword={validatePassword}
            onSubmit={submit} />

    function submit() {
        UserService.register(username, password).then(
            registerResult => {
                if (!registerResult.succes) {
                    alert(registerResult.message.detail);
                    return;
                }

                UserService.login(username, password).then(
                    loginResult => navigate(loginResult.succes ? '/' : '/login')
                );
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

        const errors = [];

        const passwordMinLength = 7;
        const specialCharacters = '!@#$%&*()_+=|<>?{}\\[\\]~-';

        if (!regEx(password, '[a-z]')) {
            errors.push('must have lowercase letter');
        }
        if (!regEx(password, '[A-Z]')) {
            errors.push('must have uppercase letter');
        }
        if (!regEx(password, '[0-9]')) {
            errors.push('must have digit');
        }
        if (!regEx(password, `[${specialCharacters}]`)) {
            errors.push('must have special character');
        }
        if (password.length < passwordMinLength) {
            errors.push(`must have at least ${passwordMinLength} characters`);
        }

        return errors;
    }

    function regEx(text, pattern) {
        return text.search(pattern) >= 0;
    }
}