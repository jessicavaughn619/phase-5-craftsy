export default function Footer() {
    const today = new Date().getFullYear();

    return (
        <div className="flex flex-col items-center py-5">
            <span>Made with ❤️ & 🍺</span>
            <span>© 
            <a className="hover:text-amber-600" href="https://jessicavaughn.netlify.app/" target="_blank" rel="noreferrer"> Jessica Vaughn</a> {today}</span>
        </div>
    )
}