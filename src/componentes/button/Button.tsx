interface MiButtonProps {
    text: string;
    icon:string;
}

export const  MiButton = ({text, icon}:MiButtonProps) => {


const handleClick = () => {
    console.log("se hizo click al componente")
}
    console.log(text)
    console.log(icon)

    return(
        <button onClick= {handleClick} className="componenete--button"> 
        <div>
            {text}
        </div>
            {icon}
        </button>
    )
}