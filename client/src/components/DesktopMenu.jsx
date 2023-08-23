import NavBar from "./NavBar"

export default function DesktopMenu({onSetUser, onSetMessage, message, productsInCart, onSetProductsInCart, isMobile}) {
    return (
        <div>
            <NavBar 
            onSetUser={onSetUser}
            onSetMessage={onSetMessage}
            message={message}
            productsInCart={productsInCart}
            onSetProductsInCart={onSetProductsInCart}
            isMobile={isMobile}
            />
        </div>
    )
}