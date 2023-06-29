import { Rating } from "flowbite-react"
import pic from "../images/profile_pic.png"

export default function Review({ review }) {

    const { rating, content, created_at, user } = review;
    const dateString = String(created_at)
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    console.log(review)

    return (
        <div className="max-w-md rounded shadow-lg hover:cursor-default">
            <div className="px-6 py-4">
                <div className="flex py-4 space-x-8 items-center justify-around">
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
                <p className="text-sm italic">{formattedDate}</p>
                </div>
                </div>
            </div>
        </div>
    )
}