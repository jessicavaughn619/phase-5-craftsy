import { BsCartCheck, BsCartX, BsCartPlus } from 'react-icons/bs'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Rating } from "flowbite-react"

export default function ProductCard({ product, productsInCart, onSetProductsInCart }) {
    const navigate = useNavigate()
   
    const [isError, setIsError] = useState(false)
    const { id, item, description, image, price, quantity, reviews } = product;
    
    const inCart = productsInCart.filter(productInCart => productInCart.id===id)

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
    }

    let sum = 0;
    let reviewCount = 0;

    reviews.forEach((review) => {
        sum += review.rating;
        reviewCount++;
    });

    const avgRatingLong = reviewCount > 0 ? sum / reviewCount : 0;
    const avgRating = avgRatingLong.toFixed(2)

    function handleReviewClick() {
        navigate(`/products/${id}`)
    }

    return (
        <div className="max-w-sm rounded grid grid-template-row-auto-1fr shadow-lg hover:cursor-default">
            <img className="object-contain h-48 w-96 hover:cursor-pointer active:object-cover" src={image} alt={item}/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item}</div>
                <p className="text-gray-700 text-base">{description}
                    <span className="hover:cursor-pointer hover:text-amber-600 pl-1 text-sm" onClick={handleReviewClick}>...more info</span>
                </p>
            </div>
                <div className="flex justify-between items-center px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{(quantity > 0) ? `In Stock: ${quantity}` : "Sold Out"}</span>
                    {(quantity > 0) ? 
                        <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${price}</span> : null}
            </div>
            <div className="flex items-center justify-between px-6 pb-2">
                {(inCart.length > 0) ? 
                    <BsCartCheck className="inline-block text-xl hover:cursor-not-allowed"/>
                     : (quantity > 0) ?
                    <BsCartPlus onClick={handleClick} className="inline-block text-xl hover:cursor-pointer hover:text-amber-600"/>
                 : <BsCartX className="inline-block text-xl hover:cursor-not-allowed"/>
                 }
                {isError ? <p>Item already in cart!</p> : null}
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
            <p className="text-sm pl-1">{(avgRating > 0) ? avgRating : null}</p>
                </div>
            </div>
        </div>
    )
}