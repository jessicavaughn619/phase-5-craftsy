import sandy_doyle from '../images/sandy_doyle.jpeg'
import backyard from '../images/backyard.jpeg'
import jessica from '../images/jessica.jpeg'
import Button from './Button'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className="m-5 mx-10 max-width-full flex flex-col justify-between gap-4">
            <div className="flex flex-col justify-between shadow-lg p-4 sm:flex-row">
                <img className="object-cover rounded-md self-center object-top sm:w-2/4 sm:h-96" src={sandy_doyle} alt="Sandy & Doyle avatar"></img>
            <div className="flex flex-col justify-evenly p-5">
                <h2 className="self-center text-amber-600 text-lg font-semibold">Owners</h2>
                <p>Craftsy is a small-business owned and operated by Sandy and Doyle.</p>
                <p>Doyle and Sandy are a part of the entire process for their ceramics - from pouring slip into molds to firing the product for the final time, they take pride in creating custom, unique products.</p>
                <p>In addition to painting, Sandy enjoys photography, cross-stitching, and gardening. Doyle is a retired contractor and loves woodworking, fixing things, and brainstorming his next million-dollar idea.</p>
                <p>Sandy and Doyle have two pets - Brandy, a husky, and B, a horse.</p>
            </div>
            </div>
            <div className="flex flex-col justify-between shadow-lg sm:flex-row-reverse">
                <img className="object-cover rounded-md self-center object-center sm:w-2/4 sm:h-96" src={backyard} alt="La Junta, CO landscape"></img>
                <div className="flex flex-col justify-evenly p-5">
                    <h2 className="self-center text-amber-600 text-lg font-semibold">Location</h2>
                    <p>Craftsy is located in beautiful  
                    <a className="hover:text-amber-600" href="https://visitlajunta.net/" target="_blank" rel="noreferrer"> La Junta, Colorado!</a> Consider passing through 'the junction' when planning your next road trip!</p>
                    <p>Thank you for visiting Craftsy and for supporting small-businesses!</p>
                </div>
            </div>
            <div className="flex flex-col justify-between shadow-lg sm:flex-row">
                <img className="object-cover rounded-md self-center object-center sm:w-2/4 sm:h-96" src={jessica} alt="Jessica avatar"></img>
                <div className="flex flex-col justify-evenly p-5">
                    <h2 className="self-center text-amber-600 text-lg font-semibold">Webmaster</h2>
                    <p className="pb-2">Craftsy's website is designed, built, and maintained by Sandy and Doyle's daughter, Jessica.</p>
                    <Button children={
                    <div>
                    <Link to='https://www.buymeacoffee.com/jvaughn619' target="_blank" rel="noopener noreferrer">Buy Jessica a Coffee ☕</Link>
                    </div>} />
                </div>
            </div>
        </div>
    )
}