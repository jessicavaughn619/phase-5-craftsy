import { BsFillCartCheckFill, BsCartX, BsCartPlus } from 'react-icons/bs'
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Rating } from "flowbite-react"
import { Context } from '../context';

export default function ProductCard({ product, productsInCart, onSetProductsInCart}) {
    const user = useContext(Context)
    const navigate = useNavigate()
   
    const [message, setMessage] = useState(null)
    const { id, item, description, image, price, quantity, reviews } = product;
    
    const inCart = productsInCart.filter(productInCart => productInCart.id===id)

    function handleSetMessage(message) {
    setMessage(message);
    setTimeout(() => {
        setMessage(null);
    }, 3000);
    }

    function handleClick() {
        if (user) {
        fetch(`/api/cart/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        }).then((r) => {
            if (r.ok) {
                onSetProductsInCart(id)
                handleSetMessage("Added to cart!")
            }
            else {
                throw new Error('Failed to add item to cart!');
            }
        })
        .catch((error) => {
            console.log(error);
            handleSetMessage(error);
        })
    } else {
        handleSetMessage("Login to add items to cart!")
    }}

    let sum = 0;
    let reviewCount = 0;

    reviews.forEach((review) => {
        sum += review.rating;
        reviewCount++;
    });

    const avgRatingLong = reviewCount > 0 ? sum / reviewCount : 0;
    const avgRating = avgRatingLong.toFixed(1)

    function handleReviewClick() {
        navigate(`/products/${id}`)
    }

    return (
        <Context.Consumer>
        { user =>
        <div className="rounded grid grid-template-row-auto-1fr shadow-lg hover:cursor-default justify-center justify-items-center max-w-full pt-4">
            <img className="object-contain h-[275px]" src={image} alt={item}/>
            <div className="flex flex-col px-6 py-4 w-4/5">
                <div className="self-center font-bold text-lg mb-2">{item}</div>
                <p className="text-gray-700 text-base text-sm mb-2">{description}</p>
                <span className="hover:cursor-pointer hover:text-amber-600 text-sm self-center" onClick={handleReviewClick}>See more info...</span>
            </div>
                <div className="flex justify-between items-center px-6 pt-4 pb-2 w-full">
                    <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">{(quantity > 0) ? `In Stock: ${quantity}` : "Sold Out"}</span>
                    {(quantity > 0) ? 
                        <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">${price}.00</span> : null}
            </div>
            <div className="flex items-center justify-between px-6 pb-2 w-full">
                {(inCart.length > 0) ? 
                    <BsFillCartCheckFill className="inline-block text-lg hover:cursor-not-allowed"/>
                     : (quantity > 0) ?
                    <BsCartPlus onClick={handleClick} className="inline-block text-lg hover:cursor-pointer hover:text-amber-600"/>
                 : <BsCartX className="inline-block text-lg hover:cursor-not-allowed"/>
                 }
                <div className="flex">
            <Rating size="sm">
                <Rating.Star
                    filled={avgRating >= 1}
                />
                <Rating.Star
                    filled={avgRating >= 2}
                />
                <Rating.Star
                    filled={avgRating >= 3}
                />
                <Rating.Star
                    filled={avgRating >= 4}
                />
                <Rating.Star
                    filled={avgRating >= 5}
                />
            </Rating>
            <p className="pl-1">{(avgRating > 0) ? avgRating : null}</p>
                </div>
            </div>
            {message ? 
            <div>
                <p className="text-amber-600 pb-2">{message}</p>
            </div> : null}
        </div>
        }
        </Context.Consumer>
    )
}