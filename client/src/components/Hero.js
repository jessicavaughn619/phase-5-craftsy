import hero from '../images/logo.png'

export default function Hero() {
    return (
        <div>
            <img className="max-w-none w-full" src={hero} alt="Craftsy logo"/>
        </div>
    )
}