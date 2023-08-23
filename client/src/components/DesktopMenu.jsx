import NavBar from "./NavBar"

export default function DesktopMenu({onSetUser, onSetMessage, message, productsInCart, onSetProductsInCart, isMobile, isMenuOpen, onSetIsMenuOpen}) {
    return (
        <div>
            <NavBar 
            onSetUser={onSetUser}
            onSetMessage={onSetMessage}
            message={message}
            productsInCart={productsInCart}
            onSetProductsInCart={onSetProductsInCart}
            isMobile={isMobile}
            onSetIsMenuOpen={onSetIsMenuOpen}
            isMenuOpen={isMenuOpen}
            />
        </div>
    )
}