import NavBar from "./NavBar"

export default function Menu({ isMenuOpen, onSetIsMenuOpen }) {
    return (
        <div className={`top-0 absolute transition-transform duration-300 ease bg-white h-screen w-3/6 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <NavBar 
            isMenu={true}
            isMenuOpen={isMenuOpen}
            onSetIsMenuOpen={onSetIsMenuOpen}
        />
        </div>
    )
}