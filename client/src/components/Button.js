export default function Button({type, children, onClick}) {
    return (
        <button type={type} onClick={onClick} className="border rounded-lg bg-amber-600 text-white hover:border-amber-600 block w-full p-2.5 dark:text-black dark:hover:border-amber-600 max-w-sm mx-auto">{children}</button>
    )
}