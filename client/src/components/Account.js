import { Context } from "../context"

export default function Account() {
    return (
        <Context.Consumer>
        {user => 
        <div className="m-5">
            <h1>Account</h1>
            <p>Welcome, {user.first_name}</p>
        </div>
        }
        </Context.Consumer>
    )
}