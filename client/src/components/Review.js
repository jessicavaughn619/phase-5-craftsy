import { Rating } from "flowbite-react"
import { Context } from "../context";
import { BsPencilSquare } from 'react-icons/bs'
import pic from "../images/profile_pic.png"

export default function Review({ review, onEditReview, onSetEditedReview }) {
    const { id, rating, content, created_at, user } = review;
    const dateString = String(created_at)
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    function handleClick() {
        onEditReview()
        onSetEditedReview({rating: rating, content: content}, id)
    }

    return (
        <Context.Consumer>
        {currentUser =>
        <div className="max-w-md rounded shadow-lg hover:cursor-default">
            <div className="px-6 py-4">
                <div className="grid grid-template-col-auto-1fr py-4 space-x-8">
                <div className="flex flex-col space-y-2 items-center">
                <img className="object-contain w-20" src={user.profile_pic ? user.profile_pic : pic} alt="user-avatar"/>
                <p className="font-semibold">{user.first_name}</p>
                </div>
                <div className="space-y-2">
                <Rating size="sm">
                <Rating.Star
                    filled={rating >= 1}
                />
                <Rating.Star
                    filled={rating >= 2}
                />
                <Rating.Star
                    filled={rating >= 3}
                />
                <Rating.Star
                    filled={rating >= 4}
                />
                <Rating.Star
                    filled={rating >= 5}
                />
            </Rating>
                <p>{content}</p>
                <div className="flex space-x-2 items-center">
                <p className="text-sm italic">{formattedDate}</p>
                {(currentUser.id === user.id) ? 
                <BsPencilSquare className="hover:text-amber-600 hover:cursor-pointer" onClick={handleClick}/> : null}
                </div>
                </div>
                </div>
            </div>
        </div>
        }
        </Context.Consumer>
    )
}