import error from '../images/404.png'

export default function Error() {
    return (
        <div className="flex flex-col justify-center">
        <p className="text-lg self-center">Page Not Found!</p>
        <img className="object-contain h-48" src={error} alt="404 Error"></img>
        </div>
    )
}