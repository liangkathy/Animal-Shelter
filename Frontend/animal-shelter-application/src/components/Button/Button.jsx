import './Button.css'

const Button = ({handleClick, style, text, cssId}) => {
    return (
        <button onClick={handleClick} className={`button ${style}`} id={cssId}>{text}</button>
    )
}

export default Button