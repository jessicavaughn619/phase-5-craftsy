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
import { Context } from "../context";
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

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
    productToAdd.quantity_in_cart = 1;
    const updatedCart = [...productsInCart, productToAdd];
    setProductsInCart(updatedCart);
    setMessage("Added to Cart!")
    setTimeout(() => {
      setMessage(null);
    } , 3000);
  }

  function handleUpdateQuantityInCart(id, quantityInCart) {
    const productToUpdate = productsInCart.find(product => (product.id===id))
    const updatedProducts = productsInCart.map(product => {
      if (product.id===productToUpdate.id) {
        return {...product, quantity_in_cart: quantityInCart}
      }
      return product;
    })
    setProductsInCart(updatedProducts)
    handleSetMessage("Successfully updated quantity in cart!")
  }

  function handleDeleteItemFromCart(id) {
    const updatedCart = productsInCart.filter(product => (product.id !== id));
    setProductsInCart(updatedCart);
    setMessage("Removed from Cart!");
    setTimeout(() => {
      setMessage(null);
    } , 3000);
  }

  function handleEmptyCart(productsFromCart) {
    const updatedProducts = products.map(product => {
      const cartItem = productsFromCart.find(item => item.id === product.id);
      if (cartItem) {
        return {...product, quantity: cartItem.quantity - cartItem.quantity_in_cart, quantity_in_cart: 0}
      }
      return product;
    })
    setProducts(updatedProducts)

    const productIds = productsFromCart.map(product => product.id)
    const updatedCart = productsFromCart.filter(product => product.id === productIds)
    setProductsInCart(updatedCart)
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

  function handleEditReview(updatedReview) {
    const { id, rating, content } = updatedReview;
    const productToUpdate = products.find(product => (product.id===(updatedReview.product_id)))

    const updatedProducts = products.map(product => {
      if (product.id===productToUpdate.id) {
        const updatedReviews = product.reviews.map(review => {
          if (review.id === id) {
            return {...review, rating: rating, content: content};
          }
          return review;
        })
        return {...product, reviews: updatedReviews}
      }
      return product;
    })
    setProducts(updatedProducts)
    handleSetMessage("Review successfully updated!")

  }

  function handleDeleteReview(id) {
    fetch(`/review/${id}`, {
        method: "DELETE"
    })

    const allReviews = products.flatMap(product => (product.reviews))
    const reviewToDelete = allReviews.find(review => (review.id===id))

    const productToUpdate = products.find(product => (product.id===(reviewToDelete.product_id)))

    const updatedProducts = products.map(product => {
      if (product.id===productToUpdate.id) {
        const updatedReviews = product.reviews.filter(review => (review.id !== reviewToDelete.id))
        return {...product, reviews: updatedReviews}
      }
      return product;
    })
    setProducts(updatedProducts)
    handleSetMessage("Review successfully deleted!")
}

const initialOptions = {
  clientId: "AXmdt024Q6sKUwG88HayNtol9x5fLiFOQzLOkS1Q87iBiKP98mCWF5_HVibYMVAIIUv7YmYoRHATOZRU",
  currency: "USD",
  intent: "capture",
};

  return (
    <Context.Provider value={user}>
      <PayPalScriptProvider options={initialOptions}>
    <div className="flex flex-col h-screen justify-between hover:cursor-default">
        <header>
        <Hero />
        <NavBar 
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
            productsInCart={productsInCart}
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
            onUpdateQuantityInCart={handleUpdateQuantityInCart}
            onEmptyCart={handleEmptyCart}
          />}
          />
          <Route path='/products/:id' element={
          <ProductPage 
            products={products}
            onAddReview={handleAddReview}
            onDeleteReview={handleDeleteReview}
            onEditReview={handleEditReview}
            user={user}
            />} 
          />
        </Routes>
        </main>
        <footer className="h-10"><Footer /></footer>
    </div>
    </PayPalScriptProvider>
    </Context.Provider>
  )
}

