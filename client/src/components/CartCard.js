import { useState } from "react";
import { MdRemoveShoppingCart } from 'react-icons/md'

export default function CardCard({ product, onDeleteItem }) {
    const { id, item, image, price, quantity } = product;    
    
    const [isError, setIsError] = useState(false)

    function handleSetError() {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }

    function handleClick() {
        fetch(`/cart/${id}`, {
            method: "DELETE"
        }).then((r) => {
            if (r.ok) {
                onDeleteItem(id)
            }
            else {
                throw new Error('Failed to remove item from cart');
            }
        })
        .catch((error) => {
            console.log(error);
            handleSetError();
        })
    }

    return (
        <div className="max-w-sm rounded shadow-lg hover:cursor-default">
            <img className="object-contain h-48 w-96" src={image} alt=""></img>
            <div className="px-6 py-6">
                <div className="font-bold text-xl mb-2">{item}</div>
            </div>
                <div className="flex justify-evenly px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${price} - Only {quantity} left!</span>
                <div>
                <MdRemoveShoppingCart onClick={handleClick} className="inline-block text-xl mb-1 hover:cursor-pointer hover:text-amber-600" />
                {isError ? <p>Problem removing item from cart, please try again</p> : null}
            </div>
        </div>
        </div>
    )
}