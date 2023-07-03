import { useState, useRef } from "react";
import { BsCartX } from 'react-icons/bs'

export default function CardCard({ product, onDeleteItem, onUpdateQuantityInCart }) {
    const { id, item, description, image, price, quantity, quantity_in_cart } = product;
   const [isError, setIsError] = useState(false)
   const [quantityInCart, setQuantityInCart] = useState(quantity_in_cart)
   const numRef = useRef(quantityInCart)


   function handleDecrementClick() {
    if (quantityInCart > 1) {
    setQuantityInCart(quantityInCart => quantityInCart - 1);
    numRef.current--;
    onUpdateQuantityInCart(id, numRef.current)
    }
   }

   function handleIncrementClick() {
    if (quantityInCart < quantity) {
    setQuantityInCart(quantityInCart => quantityInCart + 1)
    numRef.current++;
    onUpdateQuantityInCart(id, numRef.current)
    }
   }

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
        <div className="max-w-full rounded shadow-lg hover:cursor-default">
        <div className="flex">
            <img className="object-contain h-48" src={image} alt={item}></img>
            <div className="flex flex-col px-6 py-3 justify-between">
                <div className="font-bold text-xl mb-2">{item}</div>
                <div>{description}</div>
            <div className="flex flex-col py-3">
                <div className="flex">
                <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                ${price}</span>
                <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {quantity} In Stock</span>
                </div>
                <div className="flex space-x-6 items-center">
                <div className="space-x-2 p-1 border">
                    <button onClick={handleDecrementClick}>-</button>
                    <span>{quantityInCart}</span>
                    <button onClick={handleIncrementClick}>+</button>
                </div>
                <div>
                <BsCartX onClick={handleClick} className="inline-block mb-1 text-xl hover:cursor-pointer hover:text-amber-600" />
                {isError ? <p>Problem removing item from cart, please try again</p> : null}
                </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}