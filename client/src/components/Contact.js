import { useState, useRef } from "react"
import emailjs from '@emailjs/browser'
import Button from "./Button";

export default function Contact() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState("")

  const form = useRef();

  function handleSetAlert(msg) {
    setAlert(msg)
    setTimeout(() => {
      setAlert("");
    } , 3000);
  }
  
  const sendEmail = (e) => {
    e.preventDefault()
    setIsLoading(true)
    emailjs.sendForm('service_sunhybn', 'contact_form', form.current, 'JExJjzVLDyH1ul5rG')
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       handleSetAlert("Email successfully sent!")
       setIsLoading(false)
    }, (error) => {
       console.log('FAILED...', error);
       setErrors(error)
    });
    setEmail("")
    setName("")
    setMessage("")
  }
  
  return (
    <div className="bg-white dark:bg-gray-900">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-3xl tracking-tight font-bold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a question about our products? Need support with an order? Let us know.</p>
      
      <form onSubmit={sendEmail} ref={form}>
      <div className="grid gap-6 mb-2 md:grid-cols-1">
      <div>
        <label htmlFor="email" className="block mb-2 font-medium text-gray-900 text-black">Email</label>
        <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600 bg-gray-50"
            type="text"
            id="email"
            autoComplete="off"
            required
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="name" className="block mb-2 font-medium text-gray-900 text-black">Name</label>
        <input
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600 bg-gray-50"
            type="text"
            id="name"
            autoComplete="off"
            required
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="message" className="block mb-2 font-medium text-gray-900 text-black">Message</label>
        <textarea
            className="border rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:text-black dark:focus:ring-amber-600 dark:focus:border-amber-600 bg-gray-50"
            type="text"
            id="message"
            autoComplete="off"
            required
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}/>
      </div>
      <div className="text-amber-600">
            {errors.error}
      </div>
      <Button type="submit" children={isLoading ? "Loading..." : "Submit"}/>
      {alert ? <div className="text-amber-600 text-center">
            {alert}
      </div> : null}
      </div>
      </form>
  </div>
</div>
)
}
