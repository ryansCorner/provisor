import React from 'react'

const TextInput = props => {
    return (
        <div className='form-group'>
            <label htmlFor={`${props.name}Input`}>{props.label}</label>
            <input
                type={props.type}
                className={`form-control${props.showError ? ' is-invalid' : ''}`}
                name={props.name}
                id={`${props.name}Input`}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />

        </div>
    )
}
export default TextInput;
