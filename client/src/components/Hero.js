import { useNavigate } from 'react-router-dom'
import hero from '../images/logo.svg'

export default function Hero() {
    const navigate = useNavigate()

    function handleClick() {
        navigate("/")
    }
    
    return (
        <div onClick={handleClick} className="w-full lg:w-[50%] hover:cursor-pointer">
            <img className="object-cover h-48 w-96 m-auto md:m-0" src={hero} alt="logo"/>
        </div>
    )
}