import NavBar from "./NavBar"

export default function Menu({ isMenuOpen, onSetIsMenuOpen, onSetUser, onSetMessage, productsInCart, onSetProductsInCart }) {
    return (
        <div className={`top-0 z-20 absolute transition-transform duration-300 ease bg-white h-screen w-full text-xl ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <NavBar 
            isMenu={true}
            onSetIsMenuOpen={onSetIsMenuOpen}
            onSetUser={onSetUser}
            onSetMessage={onSetMessage}
            productsInCart={productsInCart}
            onSetProductsInCart={onSetProductsInCart}
        />
        </div>
    )
}