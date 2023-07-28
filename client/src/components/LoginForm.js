import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ButtonSec from "./ButtonSec";
import google from "../images/google.png"

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  function handleClick() {
    window.open("https://craftsy.onrender.com/login", "_self")
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/local_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user))
        .then(navigate("/"))
      } else {
        r.json().then((err) => setErrors(err));
      }
    });
  }

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-3xl tracking-tight font-bold text-center text-gray-900 dark:text-white">Login</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Sign in to your existing account, or login with Google</p>
      <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-2 md:grid-cols-1">
        <div>
          <label htmlFor="username" className="block mb-2 font-medium text-gray-900 text-black">Username</label>
          <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600 bg-gray-50"
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="password" className="block mb-2 font-medium text-gray-900 text-black">Password</label>
          <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600 bg-gray-50"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
            <Button type="submit" children={isLoading ? "Loading..." : "Login"}/>
          <div className="text-amber-600">
            {errors.error}
          </div>
        </div>
      </form>
      <ButtonSec onClick={handleClick}
            children={<div className="flex gap-2 items-center justify-center"><img src={google} alt="google-logo" className="h-7 w-7"/>
            <span>Login with Google</span></div>}/>
    </div>
  )
}