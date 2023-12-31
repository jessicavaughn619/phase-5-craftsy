import { useLocation } from "react-router-dom"
import { BiMenu } from "react-icons/bi"
import { useState } from "react"
import Hero from "./Hero"
import Search from "./Search"
import NavIcons from "./NavIcons"
import Menu from "./Menu"
import DesktopMenu from "./DesktopMenu"
import { Context } from "../context"

export default function Header({onSetSearch, search, productsInCart, onSetUser, onSetMessage, onSetProductsInCart,
                                message, isMobile}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const renderSearch = location.pathname === "/";

    function handleMenuOpen() {
        setIsMenuOpen(isMenuOpen => !isMenuOpen)
      }

    return (
    <Context.Consumer>
    {user => 
    <header>
    <div className="md:flex md:flex-row md:items-center">
    <Hero />
    <div className={`flex items-center justify-between w-full self-end ${!renderSearch ? "mb-6" : "pb-0"} md:justify-end lg:w-[50%]`}>
    {renderSearch && 
       <Search 
        onSetSearch={onSetSearch}
        search={search}
      />}
    {user && 
      <NavIcons 
        productsInCart={productsInCart}
      />}
    </div>
    </div>
    <Menu 
      isMenuOpen={isMenuOpen}
      onSetIsMenuOpen={setIsMenuOpen}
      onSetUser={onSetUser}
      onSetMessage={onSetMessage}
      productsInCart={productsInCart}
      onSetProductsInCart={onSetProductsInCart}
    />
    {!isMobile ? 
    <DesktopMenu
      onSetUser={onSetUser}
      isMenuOpen={isMenuOpen}
      onSetIsMenuOpen={setIsMenuOpen}
      onSetMessage={onSetMessage}
      message={message}
      productsInCart={productsInCart}
      onSetProductsInCart={onSetProductsInCart}
      isMobile={isMobile}
    /> : 
    <div className="flex justify-between items-center m-5 py-2 border-y-2 border-gray-100">
    <BiMenu className="hover:text-amber-600 cursor-pointer text-3xl m-5" onClick={handleMenuOpen}/>
    <span className="text-amber-600">{message}</span>
    </div> }
    </header>
    }
    </Context.Consumer>
    )
}