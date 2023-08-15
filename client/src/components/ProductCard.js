import { BsFillCartCheckFill, BsCartX, BsCartPlus } from 'react-icons/bs'
import { CiCircleMore } from 'react-icons/ci'
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Rating } from "flowbite-react"
import { Context } from '../context';

export default function ProductCard({ product, productsInCart, onSetProductsInCart}) {
    const user = useContext(Context)
    const navigate = useNavigate()
   
    const [message, setMessage] = useState(null)
    const [isHover, setIsHover] = useState(false)
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

    function handleMouseOver() {
        setIsHover(true)
    }

    function handleMouseOut() {
        setIsHover(false)
    }

    return (
        <Context.Consumer>
        { user =>
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="rounded grid grid-template-row-auto-1fr shadow-lg hover:cursor-default justify-items-center max-w-full p-4">
            <div className="relative">
                <img className="object-contain" src={image} alt={item}/>
                <div className={`absolute inset-0 h-full w-full bg-white transition-opacity ease-in-out duration-300 ${isHover ? "bg-opacity-60" : "bg-opacity-0"}`}>
                    {isHover && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1">
                            <CiCircleMore onClick={handleReviewClick} data-tooltip-target="tooltip-light" className="cursor-pointer text-5xl hover:text-amber-600" />
                            <div id="tooltip-light" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-amber-600 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                            More Info
                            <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    )}
                 </div>
            </div>
            <div className="flex flex-col py-4 w-full">
                <div className="font-bold text-md">{item}</div>
                <p className="text-gray-700 text-base text-sm mb-2">{description}</p>
            </div>
            <div className="flex justify-between w-full overflow-hidden">
                <div className="text-amber-600 text-bold absolute">${price.toFixed(2)}</div>
                {(inCart.length > 0) ? 
                <div className={`flex space-x-2 items-center cursor-not-allowed relative bg-white z-1 transition ease-in-out duration-300 ${isHover ? "translate-x-0" : "-translate-x-full"}`}>
                    <BsFillCartCheckFill className="inline-block text-lg text-amber-600"/>
                    <p className="text-amber-600 text-bold">ITEM IN CART</p>
                </div>
                     : (quantity > 0) ?
                    <div onClick={handleClick} className={`flex space-x-2 items-center cursor-pointer relative bg-white z-1 transition ease-in-out duration-300 ${isHover ? "translate-x-0" : "-translate-x-full"}`}>
                        <BsCartPlus className="inline-block text-lg text-amber-600"/>
                        <p className="text-amber-600 text-bold">ADD TO CART</p>
                    </div>
                 :
                 <div className={`flex space-x-2 items-center cursor-not-allowed relative bg-white z-1 transition ease-in-out duration-300 ${isHover ? "translate-x-0" : "-translate-x-full"}`}>
                    <BsCartX className="inline-block text-lg text-amber-600"/>
                    <p className="text-gray-700 text-bold">OUT OF STOCK</p>
                </div>}
                 
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
                <p className="pt-2 text-amber-600">{message}</p>
            </div> : null}
        </div>
        }
        </Context.Consumer>
    )
}