export default function Footer() {
    const today = new Date().getFullYear();

    return (
        <div className="flex flex-col items-center py-5">
            <span>Made with ❤️ & 🍺</span>
            <span>© Jessica Vaughn {today}</span>
        </div>
    )
}