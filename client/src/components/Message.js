export default function Message({message}) {
    return (
        <div className="flex absolute right-0 pr-10">
        <span className="text-amber-600">{message}</span>
        </div>
    )
}