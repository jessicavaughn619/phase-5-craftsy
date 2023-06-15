import Products from "./Products"

export default function Home({ user, products }) {
    return (
        <div className="m-5">
            <div>
                {user ? 
                <p>Welcome, {user.username}!</p> :
                <p>Check out our site!</p>}
                <Products products={products}/>
            </div>
        </div>
    )

}