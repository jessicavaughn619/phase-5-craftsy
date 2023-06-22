export default function Button({type, children}) {
    return (
        <button type={type} className="border rounded-lg hover:border-amber-600 block w-full p-2.5 dark:text-black dark:hover:border-amber-600 max-w-sm mx-auto">{children}</button>
    )
}