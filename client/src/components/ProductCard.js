import { BsCartCheck, BsCartX } from 'react-icons/bs'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Rating } from "flowbite-react"

export default function ProductCard({ product, onSetProductsInCart }) {
    const [isError, setIsError] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const navigate = useNavigate()

    const { id, item, description, image, price, in_stock, quantity, reviews } = product;
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

    function handleImgClick() {
        setIsActive(isActive => !isActive)
    }

    let sum = 0;
    let reviewCount = 0;

    reviews.forEach((review) => {
        sum += review.rating;
        reviewCount++;
    });

    const avgRating = reviewCount > 0 ? sum / reviewCount : 0;

    function handleReviewClick() {
        navigate(`/products/${id}`)
    }

    return (
        <div className="max-w-sm rounded shadow-lg hover:cursor-default">
            <img className={isActive ? "object-cover hover:cursor-pointer" : "object-contain h-48 w-96 hover:cursor-pointer"} src={image} alt={item} onClick={handleImgClick}/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item}</div>
                <p className="text-gray-700 text-base">{description}
                    <span className="hover:cursor-pointer hover:text-amber-600 pl-1 text-sm" onClick={handleReviewClick}>...more info</span>
                </p>
            </div>
                <div className="flex justify-between px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{in_stock ? `In Stock: ${quantity}` : "Sold Out"}</span>
                    {in_stock ? 
                        <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${price}</span> : null}
            </div>
            <div className="flex justify-between px-6 pb-2">
                {in_stock ? <BsCartCheck onClick={handleClick} className="inline-block text-xl hover:cursor-pointer hover:text-amber-600"/> : <BsCartX className="inline-block mb-1 hover:cursor-not-allowed hover:text-amber-600"/>}
                {isError ? <p>Problem adding item to cart, please try again</p> : null}
                <div>
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
                </div>
            </div>
        </div>
    )
}