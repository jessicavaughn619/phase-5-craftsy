import { Context } from "../context"

export default function Search({ onSetSearch, search }) {

    return (
        <Context.Consumer>
        {user => 
        <div className={`flex mx-5 ${user ? "w-56 sm:w-80 md:ml-0 md:w-56 lg:w-80" : "w-full"}`}>
            <input 
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600 bg-gray-50"
            type="text"
            id="search"
            autoComplete="off"
            value={search}
            placeholder="Search by keyword..."
            onChange={(e) => onSetSearch(e.target.value)}
            />
        </div>
        }
        </Context.Consumer>
    )
}