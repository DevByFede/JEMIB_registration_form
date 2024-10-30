import React, {ChangeEvent} from "react";

interface Props {
    label?: string,
    name?: string,
    type: string,
    placeholder?: string,
    value: string,
    disabled?: boolean,
    className?: string,
    onChangeCallback: (value: string) => void
}

const Input: React.FC<Props> = ({ label, name = "inputName", type, placeholder, value = "", disabled = false, className = "px-4 py-2", onChangeCallback }) => {

    const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeCallback(event.target.value)
    }

    return (
        <>
            <div className="flex flex-col gap-1">
                { label && <label className="text-gray-500 text-sm"> { label } </label> }
                <input name={ name }
                       type={ type }
                       placeholder={ placeholder }
                       value={ value }
                       onChange={ updateValue }
                       disabled={ disabled }
                       className={ "text-slate-800 border border-gray-200 rounded-md focus:outline-none " + className }  />
            </div>
        </>
    )
}

export default Input