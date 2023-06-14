import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Routes, Route } from "react-router-dom";

import React, { useEffect, useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const check_session_response = await fetch("/api/check_session");
        if (check_session_response.ok) {
          const user = await check_session_response.json();
          setUser(user);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, []);

  return (
    <div>
        <NavBar user={user} onSetUser={setUser}/>
        <Routes>
          <Route exact path='/' element={<Home user={user}/>}/>
          <Route path='/signup' element={<SignUpForm onLogin={setUser}/>}/>
          <Route path='/login' element={<LoginForm onLogin={setUser}/>}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/logout'/>
        </Routes>
        <Footer />
    </div>
  )
}

