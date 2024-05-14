import "./FlatButton.css";

export default function FlatButton({ children, type, disabled, onClick }) {
    return <button onClick={onClick} disabled={disabled} className="flat-button" type={type ?? 'button'}>
        <div className="flat-button-background"><div className="test"></div></div>
        <div className="flat-button-children">{children}</div>
    </button>
}