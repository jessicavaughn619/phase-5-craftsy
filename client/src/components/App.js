import Hero from "./Hero";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Error from "./Error";
import { Routes, Route } from "react-router-dom";

import React, { useEffect, useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([])
  const [productsInCart, setProductsInCart]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const check_session_response = await fetch("/check_session");
        if (check_session_response.ok) {
          const user = await check_session_response.json();
          setUser(user);
        }
        const product_response = await fetch("/products");
        const products = await product_response.json();
        setProducts(products);

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, []);

  function handleAddItemToCart(id) {
    const productToAdd = products.find(product => (product.id===id))
    const updatedCart = [...productsInCart, productToAdd]
    setProductsInCart(updatedCart)
    alert("Item added to cart!")
} 

  return (
    <div className="flex flex-col h-screen justify-between hover:cursor-default">
        <header><Hero />
        <NavBar user={user} onSetUser={setUser}/>
        </header>
        <main className="mb-auto"><Routes>
          <Route path='/' element={
          <Home 
            user={user} 
            products={products}
            onSetProductsInCart={handleAddItemToCart}
            />}
            />
          <Route path='/*' element={<Error />}/>
          <Route path='/signup' element={<SignUpForm onLogin={setUser}/>}/>
          <Route path='/login' element={<LoginForm onLogin={setUser}/>}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/cart' element={
          <Cart 
            products={productsInCart}
          />}
          />
        </Routes>
        </main>
        <footer className="h-10"><Footer /></footer>
    </div>
  )
}

