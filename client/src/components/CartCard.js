import { useState } from "react";

export default function CardCard({ product, onDeleteItem }) {
    const { id, item, price } = product;    
    
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
                throw new Error('Failed to remove item to cart');
            }
        })
        .catch((error) => {
            console.log(error);
            handleSetError();
        })
    }

    return (
        <div className="max-w-sm rounded shadow-lg hover:cursor-default">
            <img className="w-full" src="" alt=""></img>
            <div className="px-6 py-6">
                <div className="font-bold text-xl mb-2">{item}</div>
                <p className="text-gray-700 text-base">${price}</p>
                <p onClick={handleClick} className="hover:cursor-pointer">X</p>
                {isError ? <p>Problem removing item from cart, please try again</p> : null}
            </div>
        </div>
    )
}