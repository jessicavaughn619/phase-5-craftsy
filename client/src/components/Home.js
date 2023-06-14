export default function Home({ user }) {
    return (
        <div className="m-5">
            <h1>Home</h1>
            <div>
                {user ? 
                <p>Welcome, {user.username}!</p> :
                <p>Check out our site!</p>}
            </div>
        </div>
    )

}