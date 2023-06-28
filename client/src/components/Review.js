import { Rating } from "flowbite-react"

export default function Review({ review }) {

    const { rating, content, created_at } = review;
    const dateString = String(created_at)
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="max-w-sm rounded shadow-lg hover:cursor-default">
            <div className="px-6 py-4">
                <div className="py-4">
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
                </div>
                <p>{content}</p>
                <p>{formattedDate}</p>
            </div>
        </div>
    )
}