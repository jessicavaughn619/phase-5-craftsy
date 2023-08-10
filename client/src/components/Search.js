export default function Search({ onSetSearch, search }) {

    return (
        <div className="flex ml-5 w-60 md:ml-0 md:w-80 lg:w-full">
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
    )
}