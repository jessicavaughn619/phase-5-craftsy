export default function CardCard({ product }) {
    const { item, price } = product;

    return (
        <div className="max-w-sm rounded shadow-lg hover:cursor-default">
            <img className="w-full" src="" alt=""></img>
            <div className="px-6 py-6">
                <div className="font-bold text-xl mb-2">{item}</div>
                <p className="text-gray-700 text-base">${price}</p>
                <p>X</p>
            </div>
        </div>
    )
}