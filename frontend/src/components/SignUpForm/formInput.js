import { useState } from "react";
import "./formInput.css"

const FormInput = (props) => {
    const {label,errorMessage, onChange, id, ...inputProps} = props;
    const [focused,setFocused] = useState(false);
    return(
        <div className="formInput">
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} onBlur={()=>setFocused(true)} focused={focused.toString()} onFocus={()=>inputProps.name==="confrimPassword" && setFocused(true)}/>
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput;