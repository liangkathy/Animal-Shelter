import './Input.css'

const Input = ({type, name, placeholder, propRef, labelTextBefore, labelTextAfter, onChange, value, id, required, style}) => {
    return (
        <>
            <label className={!labelTextBefore ? "hidden" : undefined} htmlFor={name}>{labelTextBefore}</label>
            <input type={type} 
                    name={name} 
                    placeholder={placeholder} 
                    ref={propRef} 
                    onChange={onChange} 
                    defaultValue={value} 
                    id={id} 
                    required={required}
                    className={style} />
            <label className={!labelTextAfter ? "hidden" : undefined} htmlFor={name}>{labelTextAfter}</label>
        </>
    )
}

export default Input 