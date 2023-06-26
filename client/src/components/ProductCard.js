import { BsCartCheck, BsCartX } from 'react-icons/bs'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onSetProductsInCart }) {
    const { id, item, description, price, in_stock } = product;

    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    function handleSetError() {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }

    function handleClick() {
        fetch(`/cart/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        }).then((r) => {
            if (r.ok) {
                onSetProductsInCart(id)
            }
            else {
                throw new Error('Failed to add item to cart');
            }
        })
        .catch((error) => {
            console.log(error);
            handleSetError();
        })
        .finally(() => {
            navigate('/cart')
        })
    }

    return (
        <div className="max-w-sm rounded shadow-lg hover:cursor-default">
            <img className="w-full" src="" alt=""></img>
            <div className="px-6 py-6">
                <div className="font-bold text-xl mb-2">{item}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
                <div className="flex justify-evenly px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{in_stock ? "In Stock" : "Sold Out"}</span>
                    {in_stock ? <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${price}</span> : null}
                <div>
                {in_stock ? <BsCartCheck onClick={handleClick} className="inline-block mb-1 hover:cursor-pointer hover:text-amber-600"/> : <BsCartX className="inline-block mb-1 hover:cursor-not-allowed hover:text-amber-600"/>}
                {isError ? <p>Problem adding item to cart, please try again</p> : null}
                </div>
            </div>
        </div>
    )
}