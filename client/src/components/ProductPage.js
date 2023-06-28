import Review from "./Review";
import Button from "./Button";
import { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Rating } from 'semantic-ui-react'
import { useParams } from "react-router-dom";

export default function ProductPage({ products, onAddReview }) {
    const { id } = useParams()
    const currentProduct = products.find(product => product.id === parseInt(id))
    const { item, description, image, reviews } = currentProduct;
    const [isReview, setIsReview] = useState(false)
    const [errors, setErrors] = useState([]);

    const allReviews = reviews.map(review => (
        <Review 
        key={review.id}
        review={review}/>
    ))

    function handleClick() {
        setIsReview(isReview => !isReview)
    }

    const formSchema = yup.object().shape({
        rating: yup.number().required("Please rate this product."),
        content: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            rating: 0,
            content: "",
        },
        validationSchema: formSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                setErrors([]);

                const response = await fetch(`/product/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                })
                if (response.ok) {
                    const review = await response.json();
                    onAddReview(review)
                } else {
                    const errorData = await response.json();
                    setErrors(errorData);
                }
            } catch (error) {
                console.error("An error occurred while adding review.", error);
                setErrors([{message: "An error occurred while adding review."}])
            } finally {
                resetForm({ values: ''})
                setIsReview(false)
            }
        }
    })

    return (
        <div className="flex justify-around">
        <div className="max-w-sm rounded shadow-lg hover:cursor-default">
            <img className="object-cover" src={image} alt={item} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </div>
        <div className="flex flex-col px-6 py-4 gap-4 items-center">
        <div className="text-gray-700 text-base hover:text-amber-600 hover:cursor-pointer" onClick={handleClick}>{isReview ? "Close Product Review Form" : "Add Product Review"}</div>
        {isReview ? 
        <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-1"></div>
            <div>
          <Rating 
            icon='star' 
            defaultRating={0} 
            maxRating={5} 
            name="rating"
            type="number"
            id="rating"
            onRate={(e, { rating }) => formik.setFieldValue("rating", rating)}
            clearable
            />
          {formik.errors.rating && formik.touched.rating ? (
          <div className="text-amber-600">{formik.errors.rating}</div>
        ) : null}
        </div>
        <div>
          <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600"
            type="text"
            id="content"
            autoComplete="off"
            name="content"
            placeholder="Your thoughts here!"
            value={formik.values.content}
            onChange={formik.handleChange}
          />
          {formik.errors.content && formik.touched.content ? (
          <div className="text-amber-600">{formik.errors.content}</div>
        ) : null}
        </div>
        <Button type="submit" children="Submit Review"></Button>
        <div className="text-amber-600">
            {errors.error}
         </div>
    </form> : null}
    {allReviews}
    </div>
    </div>
    )
}