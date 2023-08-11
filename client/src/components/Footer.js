import { useNavigate } from "react-router-dom";
import hero from '../images/logo.svg'

export default function Footer() {
    const today = new Date().getFullYear();
    const navigate = useNavigate()

    function handleClick() {
        navigate("/")
    }

    return (
        <div className="flex flex-col items-center py-5 justify-between bg-gradient-to-t from-amber-600 to-45%">
            <img onClick={handleClick} className="object-cover h-48 w-96 md:m-0 hover:cursor-pointer" src={hero} alt="logo"/>
            <span>Made with ❤️ & 🍺</span>
            <span>© 
            <a className="hover:text-white" href="https://jessicavaughn.dev/" target="_blank" rel="noreferrer"> Jessica Vaughn</a> {today}</span>
        </div>
    )
}