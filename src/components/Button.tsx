import React, {ReactElement} from "react";

interface Props {
    className?: string;
    theme?: "primary" | "secondary" | "danger",
    buttonStyle?: "solid" | "outline",
    disabled?: boolean,
    onClickCallback: () => void
    children: string | ReactElement
}

const Button: React.FC<Props> = ({ className, theme = "primary", buttonStyle = "solid", disabled = false, children, onClickCallback }) => {

    const getClasses = () =>{
        let classes: string = ""

        switch (theme) {
            case "primary":
                if (buttonStyle === "solid")
                {
                    classes = 'bg-sky-500 hover:bg-sky-600 text-white'
                }
                else
                {
                    classes = 'text-sky-500 hover:text-sky-600'
                }
                break

            case "secondary":
                if (buttonStyle === "solid")
                {
                    classes = 'bg-green-500 hover:bg-green-600 text-white'
                }
                else
                {
                    classes = 'text-green-500 hover:text-green-600'
                }
                break

            case "danger":
                if (buttonStyle === "solid")
                {
                    classes = 'bg-red-500 hover:bg-red-600 text-white'
                }
                else
                {
                    classes = 'text-red-500 hover:text-red-600'
                }
                break
        }

        classes += ' rounded-md ' + className

        return classes
    }

    return (
        <>
            <button type="button" className={ getClasses() } onClick={() => onClickCallback() } disabled={disabled}>
                { children }
            </button>
        </>
    )
}

export default Button;