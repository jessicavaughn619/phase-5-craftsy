import { useState, useRef } from "react";
import { BsCartX } from 'react-icons/bs'

export default function CardCard({ product, onDeleteItem, onUpdateQuantityInCart }) {
    const { id, item, description, image, price, quantity, quantity_in_cart } = product;
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

    function handleClick() {
        fetch(`/api/cart/${id}`, {
            method: "DELETE"
        }).then((r) => {
            if (r.ok) {
                onDeleteItem(id)
            }
            else {
                throw new Error('Failed to remove item from cart');
            }
        })
    }

    return (
        <div className="grid grid-template-col-auto-1fr rounded shadow-lg hover:cursor-default">
            <img className="object-contain h-48" src={image} alt={item}></img>
            <div className="flex flex-col justify-between px-6">
                <div className="space-y-1">
                <p className="font-bold text-xl">{item}</p>
                <p>{description}</p>
                </div>
                <div className="pb-4 space-y-2">
                        <div className="flex justify-between">
                        <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        ${price}.00</span>
                        <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {quantity} In Stock</span>
                        </div>
                    <div className="flex justify-between items-center">
                    <BsCartX onClick={handleClick} className="inline-block text-xl hover:cursor-pointer hover:text-amber-600" />
                        <div className="space-x-2 py-1 px-2 border rounded-lg">
                            <button onClick={handleDecrementClick}>-</button>
                            <span>{quantityInCart}</span>
                            <button onClick={handleIncrementClick}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}