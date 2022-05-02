import React from 'react'
import './input.css'

const Input = ({type, name, value, label, onChange, required, step, min}) => {
    return (
        <div>
            <label>
                {label}
                <input  min={min} step={step} value={value} type={type} name={name} onChange={onChange} required={required}/>
            </label>
        </div>
    )
}

export default Input