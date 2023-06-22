import { BsCartCheck, BsCartX, BsHeart } from 'react-icons/bs'

export default function ProductCard({ product }) {
    const { item, description, price, in_stock } = product;
    return (
        <div className="max-w-sm rounded overflow-scroll shadow-lg hover:cursor-default">
            <img className="w-full" src="" alt=""></img>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{in_stock ? "In Stock" : "Sold Out"}</span>
                    {in_stock ? <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${price}</span> : null}
                </div>
                <div className="flex ml-6 mr-6 mt-4 mb-4 justify-between">
                    {in_stock ? <BsCartCheck className="hover:cursor-pointer hover:text-amber-600"/> : <BsCartX className="hover:cursor-not-allowed hover:text-amber-600"/>}
                    <BsHeart className="hover:cursor-pointer hover:text-amber-600"/>
                </div>
        </div>
    )
}