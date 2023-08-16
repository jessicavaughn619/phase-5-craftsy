import { useState, useRef } from "react";
import { BsCartX } from 'react-icons/bs'

export default function CardCard({ product, onDeleteItem, onUpdateQuantityInCart }) {
    const { id, item, description, image, price, quantity, quantity_in_cart } = product;
   const [quantityInCart, setQuantityInCart] = useState(quantity_in_cart)
   const [isHover, setIsHover] = useState(false)
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

    function handleMouseOver() {
        setIsHover(true)
    }

    function  handleMouseOut() {
        setIsHover(false)
    }

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="grid grid-template-col-auto-1fr rounded shadow-lg gap-2">
            <img className="object-contain h-48 p-2" src={image} alt={item}></img>
            <div className="flex flex-col justify-between p-2">
                <div>
                    <div className="font-bold text-md">{item}</div>
                    <p className="text-gray-700 text-base text-sm mb-2">{description}</p>
                </div>
                <div className="flex justify-between items-end overflow-hidden">
                    <div className="text-amber-600 text-bold absolute">${price.toFixed(2)}</div>
                    <div className={`flex space-x-2 items-center cursor-pointer relative bg-white z-1 transition ease-in-out duration-300 ${isHover ? "translate-x-0" : "-translate-x-full"}`}>
                        <BsCartX onClick={handleClick} className="inline-block text-lg text-amber-600"/>
                        <p className="text-amber-600 text-bold">Remove from Cart</p>
                    </div>
                    <div className="flex flex-col">
                        <div>In Stock: {quantity}</div>
                        <div className="flex space-x-2 py-1 justify-center border rounded-lg">
                            <button onClick={handleDecrementClick} className={quantityInCart > 1 ? "cursor-pointer opacity-100" : "opacity-25 cursor-not-allowed"}>-</button>
                            <span>{quantityInCart}</span>
                            <button onClick={handleIncrementClick} className={quantityInCart < quantity ? "cursor-pointer opacity-100" : "opacity-25 cursor-not-allowed"}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}