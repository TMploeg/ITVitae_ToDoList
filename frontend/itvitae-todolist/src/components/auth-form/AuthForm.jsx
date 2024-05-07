import { useState } from "react";
import "./auth_styles.css";

export default function AuthForm({ title, username, onUsernameChanged, password, onPasswordChanged, validatePassword, onSubmit }) {
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [usernameHasFocus, setUsernameHasFocus] = useState(false);

    const [passwordTouched, setPasswordTouched] = useState(false);
    const [passwordHasFocus, setPasswordHasFocus] = useState(false);

    const usernameInvalid = !usernameHasFocus && usernameTouched && getUsernameErrors().length > 0;
    const passwordInvalid = !passwordHasFocus && passwordTouched && getPasswordErrors().length > 0;


    return <div className="form-container">
        {title ? <h1>{title}</h1> : null}
        <form className="auth-form">
            <div className="form-field">
                <input
                    value={username}
                    onChange={event => onUsernameChanged(event.target.value)}
                    onFocus={() => usernameFocusedChanged(true)}
                    onBlur={() => usernameFocusedChanged(false)} />
                {usernameInvalid ? <div className="form-field-error">username is invalid <button type="button" onClick={showUsernameErrors}>reason</button></div> : null}
            </div>
            <div className="form-field">
                <input
                    value={password}
                    onChange={event => onPasswordChanged(event.target.value)}
                    onFocus={() => passwordFocusedChanged(true)}
                    onBlur={() => passwordFocusedChanged(false)} />
                {passwordInvalid ? <div className="form-field-error">password is invalid <button type="button" onClick={showPasswordErrors}>reason</button></div> : null}
            </div>
            <button className="form-button" type="button" onClick={onSubmit} disabled={usernameInvalid || passwordInvalid}>Submit</button>
        </form>
    </div>

    function getUsernameErrors() {
        const errors = [];
        if (username.length === 0) {
            errors.push('username is required');
        }
        return errors;
    }

    function getPasswordErrors() {
        const errors = [];

        if (!password || password.length == 0) {
            errors.push('password is required');
        }

        if (validatePassword) {
            const passwordMinLength = 7;
            const specialCharacters = '!@#$%&*()_+=|<>?{}\\[\\]~-';

            if (password.length < passwordMinLength) {
                errors.push(`must have at least ${passwordMinLength} characters`);
            }
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
        }

        return errors;
    }

    function regEx(text, pattern) {
        return text.search(pattern) >= 0;
    }

    function showUsernameErrors() {
        alert(getUsernameErrors().map(s => `- ${s}`).join('\n'));
    }

    function showPasswordErrors() {
        alert(getPasswordErrors().map(s => `- ${s}`).join('\n'));
    }

    function usernameFocusedChanged(focused) {
        if (focused) {
            setUsernameTouched(true);
        }

        setUsernameHasFocus(focused);
    }

    function passwordFocusedChanged(focused) {
        if (focused) {
            setPasswordTouched(true);
        }

        setPasswordHasFocus(focused);
    }
}