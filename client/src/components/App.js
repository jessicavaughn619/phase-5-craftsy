import Hero from "./Hero";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Wishlists from "./Wishlists";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Routes, Route } from "react-router-dom";

import React, { useEffect, useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const check_session_response = await fetch("/check_session");
        // if (check_session_response.ok) {
        //   const user = await check_session_response.json();
        //   setUser(user);
        // }
        const product_response = await fetch("/products");
        const products = await product_response.json();
        setProducts(products);

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, []);

  return (
    <div>
        <Hero />
        <NavBar user={user} onSetUser={setUser}/>
        <Routes>
          <Route exact path='/' element={<Home user={user} products={products}/>}/>
          <Route path='/signup' element={<SignUpForm onLogin={setUser}/>}/>
          <Route path='/login' element={<LoginForm onLogin={setUser}/>}/>
          <Route path='/about' element={<About />}/>
          <Route path='/wishlists' element={<Wishlists />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/logout'/>
        </Routes>
        <Footer />
    </div>
  )
}

