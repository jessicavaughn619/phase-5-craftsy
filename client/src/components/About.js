import sandy_doyle from '../images/sandy_doyle.jpeg'
import backyard from '../images/backyard.jpeg'
import jessica from '../images/jessica.jpeg'
import Button from './Button'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className="m-5 mx-10 max-width-full flex flex-col justify-between">
            <div className="flex flex-col justify-between shadow-lg sm:flex-row">
                <img className="object-cover h-96 w-48 rounded-md self-center" src={sandy_doyle} alt="Sandy & Doyle avatar"></img>
            <div className="flex flex-col justify-evenly p-5">
                <p>Craftsy is a small-business owned and operated by Sandy and Doyle.</p>
                <p>Doyle and Sandy are a part of the entire process for their ceramics - from pouring slip into molds to firing the product for the final time, they take pride in creating custom, unique products.</p>
            </div>
            </div>
            <div className="flex flex-col justify-between shadow-lg sm:flex-row">
                <div className="flex flex-col justify-evenly p-5">
                    <p>Craftsy is located in beautiful  
                    <a className="hover:text-amber-600" href="https://visitlajunta.net/" target="_blank" rel="noreferrer"> La Junta, Colorado!</a> Consider passing through 'the junction' when planning your next road trip!</p>
                    <p>Thank you for visiting Craftsy and for supporting small-businesses!</p>
                </div>
                <img className="object-cover w-48 h-96 rounded-md self-center" src={backyard} alt="La Junta, CO landscape"></img>
            </div>
            <div className="flex flex-col justify-between shadow-lg sm:flex-row">
                <img className="object-cover w-48 h-96 rounded-md self-center" src={jessica} alt="Jessica avatar"></img>
                <div className="flex flex-col justify-evenly p-5">
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