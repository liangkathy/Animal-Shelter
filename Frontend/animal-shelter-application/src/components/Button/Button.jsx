import './Button.css'

const Button = ({handleClick, style, text, cssId, condition}) => {
    return (
        <button 
            onClick={handleClick} 
            className={`button ${style}`} 
            id={cssId}
            disabled={condition} >{text}</button>
    )
}

export default Button