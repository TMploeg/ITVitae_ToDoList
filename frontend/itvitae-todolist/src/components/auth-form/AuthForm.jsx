import "./auth_styles.css";

export default function AuthForm({ title, username, onUsernameChanged, password, onPasswordChanged, onSubmit }) {
    const usernameInvalid = getUsernameErrors().length > 0;
    const passwordInvalid = getPasswordErrors().length > 0;

    return <div className="form-container">
        {title ? <h1>{title}</h1> : null}
        <form className="auth-form">
            <div className="form-field">
                <input value={username} onChange={event => onUsernameChanged(event.target.value)} />
                {usernameInvalid ? <div>username is invalid</div> : null}
            </div>
            <div className="form-field">
                <input value={password} onChange={event => onPasswordChanged(event.target.value)} />
                {passwordInvalid ? <div>password is invalid</div> : null}
            </div>
            <button type="button" onClick={onSubmit} disabled={usernameInvalid || passwordInvalid}>Submit</button>
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

        return errors;
    }

    function regEx(text, pattern) {
        return text.search(pattern) >= 0;
    }
}