import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import google from "../images/google.png"

export default function SignUpForm({ onLogin }) {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    function handleClick() {
      window.open("http://localhost:5555/login", "_self")
    }

    const formSchema = yup.object().shape({
        first_name: yup.string().required("First name is required"),
        last_name: yup.string().required("Last name is required"),
        username: yup.string().required("Username is required")
        .min(6, "Username must be at least 6 characters long")
        .max(15, "Username cannot exceed 15 characters"),
        password: yup.string().required("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .test("no-username-match", "Username should not be similar to email", function (value) {
          const { username } = this.parent;
          return !value.toLowerCase().includes(username.toLowerCase());
        }),
        passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Password confirmation is required"),
      });
    
      const formik = useFormik({
        initialValues: {
          first_name: "",
          last_name: "",
          username: "",
          password: "",
          passwordConfirmation: "",
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
          try {
            setErrors([]);
            setIsLoading(true);
    
            const response = await fetch("/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            
            if (response.ok) {
              const user = await response.json();
              onLogin(user);
              navigate("/")
            } else {
              const errorData = await response.json();
              setErrors(errorData);
            }
          } catch (error) {
            console.error("An error occurred during signup.", error);
            setErrors([{message: "An error occurred during signup."}]);
          } finally {
            setIsLoading(false);
          }
        }
      });

  return (
    <div className="m-5">
      <form onSubmit={formik.handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-1">
      <div>
          <label htmlFor="first_name" className="block mb-2 font-medium text-gray-900 text-black">First Name</label>
          <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600"
            type="text"
            id="first_name"
            autoComplete="off"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
          />
          {formik.errors.first_name && formik.touched.first_name ? (
          <div className="text-amber-600">{formik.errors.first_name}</div>
        ) : null}
        </div>
        <div>
          <label htmlFor="last_name" className="block mb-2 font-medium text-gray-900 text-black">Last Name</label>
          <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600"
            type="text"
            id="last_name"
            autoComplete="off"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
          />
          {formik.errors.last_name && formik.touched.last_name ? (
          <div className="text-amber-600">{formik.errors.last_name}</div>
        ) : null}
        </div>
        <div>
          <label htmlFor="username" className="block mb-2 font-medium text-gray-900 text-black">Username</label>
          <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600"
            type="text"
            id="username"
            autoComplete="off"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username ? (
          <div className="text-amber-600">{formik.errors.username}</div>
        ) : null}
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-medium text-gray-900 text-black">Password</label>
          <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
          <div className="text-amber-600">{formik.errors.password}</div>
        ) : null}
        </div>
        <div>
          <label htmlFor="passwordConfirmation" className="block mb-2 font-medium text-gray-900 text-black">Password Confirmation</label>
          <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600"
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
          />
          {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? (
          <div className="text-amber-600">{formik.errors.passwordConfirmation}</div>
        ) : null}
          </div>
          <Button type="submit" children={isLoading ? "Loading..." : "Sign Up"}/>
          <div className="text-amber-600">
            {errors.error}
          </div>
      </div>
    </form>
    <button onClick={handleClick} className="flex border gap-2 rounded-lg hover:border-amber-600 w-full p-2.5 dark:text-black dark:hover:border-amber-600 items-center justify-center max-w-sm mx-auto">
      <img src={google} alt="google-logo" className="h-7 w-7"/>
      <span>Login with Google</span>
    </button>
  </div>
  )
}