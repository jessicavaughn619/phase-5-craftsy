import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import ProductPage from "./ProductPage";
import Footer from "./Footer";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Error from "./Error";
import Loading from "./Loading";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Context } from "../context";
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Account from "./Account";
import Header from "./Header";

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([])
  const [productsInCart, setProductsInCart]= useState([])
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);
  const [initialDataFetched, setInitialDataFetched] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!initialDataFetched) {
      const fetchInitialData = async () => {
        try {
          const check_session_response = await fetch("/api/check_session", {
            credentials: "same-origin",
          });
          if (check_session_response.ok) {
            const user = await check_session_response.json();
            setUser(user);
          }
          const product_response = await fetch("/api/products");
          if (product_response.ok) {
            const products = await product_response.json();
            setProducts(products);
          }
          const check_cart_response = await fetch("/api/cart");
          if (check_cart_response.ok) {
            const productsInCart = await check_cart_response.json();
            setProductsInCart(productsInCart)
          }
          setInitialDataFetched(true)

        } catch (error) {
          console.log(error)
        }
      }
      fetchInitialData()
    }
    }, [initialDataFetched]);

  function handleAddItemToCart(id) {
    const productToAdd = products.find(product => (product.id===id));
    productToAdd.quantity_in_cart = 1;
    const updatedCart = [...productsInCart, productToAdd];
    setProductsInCart(updatedCart);
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

    fetch(`/api/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantityInCart }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update quantity in cart');
        }
        return response.json()
        .then(handleSetMessage("Updated quantity in cart"))
      })
      .catch(error => {
        console.error('Error updating quantity in cart:', error);
      });
  }

  function handleDeleteItemFromCart(id) {
    const updatedCart = productsInCart.filter(product => (product.id !== id));
    setProductsInCart(updatedCart);
    setMessage("Removed from cart!");
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

  function handleResetCart(productsFromCart) {
    const updatedProducts = products.map(product => {
      const cartItem = productsFromCart.find(item => item.id === product.id);
      if (cartItem) {
        return {...product, quantity_in_cart: 0}
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
    handleSetMessage("Review submitted!")
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
    handleSetMessage("Review updated!")

  }

  function handleDeleteReview(id) {
    fetch(`/api/review/${id}`, {
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
    handleSetMessage("Review deleted!")
}

const initialOptions = {
  clientId: "AZLV44_ACpRm8jaWC6AwhJnYzX7Lc9CJjAWHg481Gk4C1kf_JRxEuKtQpMAYeEPPCKvMEND33ILfaqF0",
  currency: "USD",
  intent: "capture",
};

function handleSetUser(state) {
  setUser(state)
}

if (!initialDataFetched) {
  return <Loading />
}

  return (
    <Context.Provider value={user}>
      <PayPalScriptProvider options={initialOptions}>
    <div className="flex flex-col h-screen justify-between hover:cursor-default text-gray-600">
      <Header 
        onSetSearch={setSearch}
        search={search}
        productsInCart={productsInCart}
        onSetUser={handleSetUser}
        onSetMessage={handleSetMessage}
        onSetProductsInCart={handleResetCart}
        message={message}
        isMobile={isMobile}
      />
        <main className="mb-auto">
        <Routes>
          <Route exact path='/' element={
          <Home 
            search={search}
            products={products}
            onSetProductsInCart={handleAddItemToCart}
            productsInCart={productsInCart}
            />}
            />
          <Route path='/*' element={<Error />}/>
          <Route exact path='/signup' element={<SignUpForm onLogin={setUser}/>}/>
          <Route exact path='/login' element={<LoginForm onLogin={setUser}/>}/>
          <Route exact path='/about' element={<About />}/>
          <Route 
          exact path='/contact' 
          element={<Contact
           />}/>
          <Route path='/account' element={
          <Account 
          />}
          />
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

