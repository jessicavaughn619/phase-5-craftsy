import { BsCartCheck, BsCartX, BsCartPlus } from 'react-icons/bs'
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Rating } from "flowbite-react"
import { Context } from '../context';

export default function ProductCard({ product, productsInCart, onSetProductsInCart }) {
    const user = useContext(Context)
    const navigate = useNavigate()
   
    const [isError, setIsError] = useState(null)
    const { id, item, description, image, price, quantity, reviews } = product;
    
    const inCart = productsInCart.filter(productInCart => productInCart.id===id)

    function handleSetError(error) {
        setIsError(error);
        setTimeout(() => {
          setIsError(null);
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
            }
            else {
                throw new Error('Failed to add item to cart');
            }
        })
        .catch((error) => {
            console.log(error);
            handleSetError(error);
        })
    } else {
        handleSetError("Login to add items to cart")
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
            <img className="object-contain h-48 w-96" src={image} alt={item}/>
            <div className="flex flex-col px-6 py-4 w-4/5">
                <div className="self-center font-bold text-xl mb-2">{item}</div>
                <p className="text-gray-700 text-base">{description}</p>
                <span className="hover:cursor-pointer hover:text-amber-600 pl-1 text-sm self-center" onClick={handleReviewClick}>See more info...</span>
            </div>
                <div className="flex justify-between items-center px-6 pt-4 pb-2 w-4/5">
                    <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{(quantity > 0) ? `In Stock: ${quantity}` : "Sold Out"}</span>
                    {(quantity > 0) ? 
                        <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${price}.00</span> : null}
            </div>
            <div className="flex items-center justify-between px-6 pb-2 w-4/5">
                {(inCart.length > 0) ? 
                    <BsCartCheck className="inline-block text-xl hover:cursor-not-allowed"/>
                     : (quantity > 0) ?
                    <BsCartPlus onClick={handleClick} className="inline-block text-xl hover:cursor-pointer hover:text-amber-600"/>
                 : <BsCartX className="inline-block text-xl hover:cursor-not-allowed"/>
                 }
                {isError ? <p>{isError}</p> : null}
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
        </div>
        }
        </Context.Consumer>
    )
}