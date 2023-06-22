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
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        username: yup.string().required("Username is required").min(6, "Username must be at least 6 characters long").max(15, "Username cannot be longer than 15 characters"),
        password: yup.string().required("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .test("no-username-match", "Password should not be similar to username", function (value) {
          const { username } = this.parent;
          return !value.toLowerCase().includes(username.toLowerCase());
        }),
        passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Password confirmation is required"),
      });
    
      const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
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
      <div id="firstname-input">
          <label htmlFor="firstName">First Name</label>
          <input
            className="px-4 py-1 rounded-full"
            type="text"
            id="firstName"
            autoComplete="off"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}
        </div>
        <div id="lastname-input">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="px-4 py-1 rounded-full"
            type="text"
            id="lastName"
            autoComplete="off"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}
        </div>
        <div id="username_input">
          <label htmlFor="username">Username</label>
          <input
            className="px-4 py-1 rounded-full"
            type="text"
            id="username"
            autoComplete="off"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}
        </div>
        <div id="password-input">
          <label htmlFor="password">Password</label>
          <input
            className="px-4 py-1 rounded-full"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        </div>
        <div id="password-confirmation-input">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            className="px-4 py-1 rounded-full"
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
          />
          {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? (
          <div className="error">{formik.errors.passwordConfirmation}</div>
        ) : null}
          </div>
        <div id="submit-button">
          <Button type="submit" children={isLoading ? "Loading..." : "Sign Up"}/>
        </div>
          <div id="errors">
            {errors.error}
          </div>
      </form>
      <div>
      <button onClick={handleClick} className="flex flex-row items-center px-4 py-1 border-solid border-2 border-black rounded-full hover:border-amber-600">
      <img src={google} alt="google-logo" className="h-7 w-7"/>
      Login with Google</button>
    </div>
    </div>
  )
}