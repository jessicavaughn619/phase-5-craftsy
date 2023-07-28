import { Rating } from "flowbite-react"
import { useState } from "react"
import ButtonSec from "./ButtonSec";
import Button from "./Button";
import { AiOutlineDelete, AiOutlineClose } from 'react-icons/ai'

export default function EditReview({ editedReview, id, onDeleteReview, onSetEditReview, onEditReview }) {
    const { rating, content } = editedReview;
    
    const [updatedRating, setUpdatedRating] = useState(rating);
    const [updatedContent, setUpdatedContent] = useState(content)
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/api/review/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({rating: updatedRating, content: updatedContent}),
        }).then((response) => {
            if (response.ok) {
                response.json()
                .then((updatedReview) => onEditReview(updatedReview))
                .then(onSetEditReview(false))
            } else {
                response.json().then((err) => setErrors(err));
            }
        })
    }

    function handleDeleteClick() {
        onDeleteReview(id)
        onSetEditReview(false)
    }

    const handleStarClick = (starId) => {
        setUpdatedRating(starId)
    }
    
    function handleClick() {
        onSetEditReview()
    }

    return (
        <div>
        <ButtonSec onClick={handleClick} children={<div className="flex items-center justify-center space-x-2">
            <AiOutlineClose /><p>Close Form</p></div>}></ButtonSec>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mt-4 md:grid-cols-1">
            <div className="grid px-10 pt-2 pb-2 place-items-center">
            <Rating size="md" className="hover:cursor-pointer">
                <Rating.Star
                    filled={updatedRating >= 1}
                    onClick={() => handleStarClick(1)}
                />
                <Rating.Star
                    filled={updatedRating >= 2}
                    onClick={() => handleStarClick(2)}
                />
                <Rating.Star
                    filled={updatedRating >= 3}
                    onClick={() => handleStarClick(3)}
                />
                <Rating.Star
                    filled={updatedRating >= 4}
                    onClick={() => handleStarClick(4)}
                />
                <Rating.Star
                    filled={updatedRating >= 5}
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
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        </div>
        <Button type="submit" children="Submit Updated Review"></Button>
        <div className="text-amber-600">
            {errors.error}
         </div>
         </div>
    </form>
    <ButtonSec
        onClick={handleDeleteClick} 
        children={
        <div className="flex items-center justify-center space-x-2"><AiOutlineDelete />
        <p>Delete Review</p>
        </div>}>
        </ButtonSec>
    </div>
    )
}