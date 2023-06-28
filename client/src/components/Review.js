import { Rating } from 'semantic-ui-react'

export default function Review({ review }) {
    const { rating, content, created_at, user_id } = review;
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
            <Rating icon='star' defaultRating={rating} maxRating={5} disabled/>
            <p>{content}</p>
            <span>{user_id}</span>
            <span>{formattedDate}</span>
            </div>
        </div>
    )
}