import Hero from "./Hero";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import ProductPage from "./ProductPage";
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
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const check_session_response = await fetch("/check_session");
        if (check_session_response.ok) {
          const user = await check_session_response.json();
          setUser(user);
        }
        const check_cart_response = await fetch("/cart");
        if (check_cart_response.ok) {
          const productsInCart = await check_cart_response.json();
          setProductsInCart(productsInCart)
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
    const productToAdd = products.find(product => (product.id===id));
    const updatedCart = [...productsInCart, productToAdd];
    setProductsInCart(updatedCart);
    setMessage("Added to Cart!")
    setTimeout(() => {
      setMessage(null);
    } , 3000);
  }

  function handleDeleteItemFromCart(id) {
    const updatedCart = productsInCart.filter(product => (product.id !== id));
    setProductsInCart(updatedCart);
    setMessage("Removed from Cart!");
    setTimeout(() => {
      setMessage(null);
    } , 3000);
  }

  function handleSetMessage(text) {
    setMessage(text)
    setTimeout(() => {
      setMessage(null);
    } , 3000);
  }

  function handleAddReview(review) {
    const productToUpdate = products.find(product => (product.id===review.product_id))
    const updatedProducts = products.map(product => {
      if (product.id===productToUpdate.id) {
        const updatedReviews = [...product.reviews, review]
        return {...product, reviews: updatedReviews}
      }
      return product;
    })
    setProducts(updatedProducts)
    handleSetMessage("Review successfully submitted!")
  }

  return (
    <div className="flex flex-col h-screen justify-between hover:cursor-default">
        <header>
        <Hero />
        <NavBar 
          user={user} 
          onSetUser={setUser}
          message={message}
          onSetMessage={handleSetMessage}
        />
        </header>
        <main className="mb-auto"><Routes>
          <Route path='/' element={
          <Home 
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
            onDeleteItem={handleDeleteItemFromCart}
          />}
          />
          <Route path='/products/:id' element={
          <ProductPage 
            products={products}
            onAddReview={handleAddReview}
            />} 
          />
        </Routes>
        </main>
        <footer className="h-10"><Footer /></footer>
    </div>
  )
}

