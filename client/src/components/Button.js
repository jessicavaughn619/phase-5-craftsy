export default function Button({type, children}) {
    return (
        <button type={type} className="px-2 py-1 border-solid border-2 border-black rounded-full hover:border-amber-600">{children}</button>
    )
}