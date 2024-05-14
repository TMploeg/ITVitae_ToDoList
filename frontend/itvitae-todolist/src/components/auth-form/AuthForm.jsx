import InputField from "../reusable/input-field";
import "./auth_styles.css";

export default function AuthForm({ title, username, onUsernameChanged, validateUsername, password, onPasswordChanged, validatePassword, onSubmit }) {
    const usernameErrors = validateUsername ? validateUsername(username) : [];
    const passwordErrors = validatePassword ? validatePassword(password) : [];
    const valid = usernameErrors.length === 0 && passwordErrors.length === 0;

    return <div className="form-container">
        {title ? <h1 className="form-title">{title}</h1> : null}
        <form className="auth-form">
            <div className="form-field">
                <InputField
                    errors={usernameErrors}
                    label="username"
                    value={username}
                    onValueChanged={onUsernameChanged}
                    onFocus={() => usernameFocusedChanged(true)}
                    onBlur={() => usernameFocusedChanged(false)} />
            </div>
            <div className="form-field">
                <InputField
                    errors={passwordErrors}
                    label="password"
                    value={password}
                    onValueChanged={onPasswordChanged}
                    onFocus={() => passwordFocusedChanged(true)}
                    onBlur={() => passwordFocusedChanged(false)} />
            </div>
            <button className="form-button" type="button" onClick={onSubmit} disabled={!valid}>Submit</button>
        </form>
    </div>
}