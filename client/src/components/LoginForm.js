import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
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
    <div className="m-5">
    <h2>Login to Craftsy</h2>
      <form onSubmit={handleSubmit}>
        <div id="username-input">
          <label htmlFor="username">Username</label>
          <input
            className="px-4 py-1 rounded-full"
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div id="password-input">
          <label htmlFor="password">Password</label>
          <input
            className="px-4 py-1 rounded-full"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <div id="submit-button">
            <Button type="submit" children={isLoading ? "Loading..." : "Login"}/>
          </div>
          <div id="errors">
            {errors.error}
          </div>
      </form>
    </div>
  )
}