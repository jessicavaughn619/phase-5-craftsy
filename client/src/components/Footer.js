export default function Footer() {
    const today = new Date().getFullYear();

    return (
        <footer className="m-5 absolute bottom-0">
            Made with ❤️ & 🍺
            <br />
            © Jessica Vaughn {today} 
        </footer>
    )
}