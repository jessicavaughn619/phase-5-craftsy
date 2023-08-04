import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "flowbite-react"
import { Context } from "../context";
import Review from "./Review";
import Button from "./Button";
import ButtonSec from "./ButtonSec";
import EditReview from "./EditReview";
import { AiOutlineClose } from 'react-icons/ai'

export default function ProductPage({ products, onAddReview, onDeleteReview, onEditReview }) {
    const user = useContext(Context)
    const [isReview, setIsReview] = useState(false)
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([]);
    const [isEditReview, setIsEditReview] = useState(false)
    const [reviewId, setReviewId] = useState(null)
    const [editedReview, setEditedReview] = useState({rating: null, content: null})
    const [message, setMessage] = useState(null)

    const { id } = useParams()

    let user_id;
    if (user) {
        user_id = user.id
    } else {
        user_id = null
    }

    function handleEditReview() {
        setIsEditReview(isEditReview => !isEditReview)
        setIsReview(false)
    }

    function handleSetEditedReview({rating, content}, reviewId) {
        setEditedReview({rating: rating, content: content})
        setReviewId(reviewId)
    }

    const currentProduct = products.find(product => product.id === parseInt(id))
    const { item, description, image, reviews } = currentProduct;

    const allReviews = reviews.map(review => (
        <Review 
        key={review.id}
        review={review}
        onEditReview={handleEditReview}
        onSetEditedReview={handleSetEditedReview}
        />
    ))

    const handleStarClick = (starId) => {
        setRating(starId)
    }

    function handleClick() {
        if (user) {
        setIsReview(isReview => !isReview)
        setContent("")
        setRating(0)
    } else {
        setMessage("Please login to leave a review!")
        setTimeout(() => {
            setMessage(null);
          } , 3000);
    }
}

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/api/product/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {rating, content, user_id }),
        }).then((response) => {
            if (response.ok) {
                response.json().then((review) => onAddReview(review))
                .then(setIsReview(false))
                .then(setContent(""))
                .then(setRating(0))
            } else {
                response.json().then((err) => setErrors(err));
            }
        })
    }

    return (
        <Context.Consumer>
        {user =>
        <div className="flex flex-col justify-evenly md:flex-row">
        <div className="max-w-sm rounded shadow-lg p-4 self-center hover:cursor-default">
            <img className="object-cover" src={image} alt={item} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                <h2 className="font-bold text-xl mb-2">{item}</h2></div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </div>
        <div className="flex flex-col py-4 gap-4 self-center md:self-start">
        {isEditReview ? null : 
        <div className="flex flex-col gap-2"><ButtonSec
        onClick={handleClick} children={isReview ? <div className="flex items-center justify-center space-x-2"><AiOutlineClose /><p>Close Form</p></div> : "Add Product Review"}></ButtonSec>
        <div className="text-amber-600 self-center">{message}</div>
        </div>}
        {isEditReview ? 
        <EditReview 
            editedReview={editedReview}
            id={reviewId}
            onSetEditReview={handleEditReview}
            onDeleteReview={onDeleteReview}
            onEditReview={onEditReview}
        /> : null}
        {isReview ? 
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
            <div className="grid px-10 pt-2 pb-2 place-items-center">
            <Rating size="md" className="hover:cursor-pointer">
                <Rating.Star
                    filled={rating >= 1}
                    onClick={() => handleStarClick(1)}
                />
                <Rating.Star
                    filled={rating >= 2}
                    onClick={() => handleStarClick(2)}
                />
                <Rating.Star
                    filled={rating >= 3}
                    onClick={() => handleStarClick(3)}
                />
                <Rating.Star
                    filled={rating >= 4}
                    onClick={() => handleStarClick(4)}
                />
                <Rating.Star
                    filled={rating >= 5}
                    onClick={() => handleStarClick(5)}
                />
            </Rating>
        </div>
        <div>
          <textarea
            className="border focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600"
            type="text"
            rows="4"
            id="content"
            autoComplete="off"
            name="content"
            placeholder="Your thoughts here!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button type="submit" children="Submit Review"></Button>
        <div className="text-amber-600">
            {errors.error}
         </div>
         </div>
    </form> : null}
    {allReviews}
    </div>
    </div>
        }
    </Context.Consumer>
    )
}