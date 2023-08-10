import hero from '../images/logo.svg'

export default function Hero() {
    return (
        <div className="w-full lg:w-[33%]">
            <img className="object-cover h-48 w-96 m-auto md:m-0" src={hero} alt="logo"/>
        </div>
    )
}