export default function Footer() {
    const today = new Date().getFullYear();

    return (
        <footer className="position: sticky">
            Made with ❤️ & 🍺
            <br />
            © Jessica Vaughn {today} 
        </footer>
    )
}