import "./IconButton.css";

export default function IconButton({ onClick, imgUrl, type }) {
    return <button onClick={onClick} type={type ?? 'button'} className="icon-button">
        <img className="icon-button-img" src={imgUrl ? imgUrl : ''} />
    </button>
}