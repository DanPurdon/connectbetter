import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserContacts } from "../APIManager"
import "./Contacts.css"

export const ContactList = ({searchTermState}) => {
    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    // const [highPrice, setHighPrice] = useState(false)
    // const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()


    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)

    useEffect(
        () => {
            getUserContacts(connectUserObject.id)
                .then((contactArray) => {
                    setContacts(contactArray)
                }) 
        },
        [] // When this array is empty, you are observing initial component state
    )
    
    useEffect(
        () => {
            setFilteredContacts(contacts)
        },
        [contacts]
    )

    useEffect(
        () => {
            const searchedContacts = contacts.filter(contact => {
                return contact.firstName.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredContacts(searchedContacts)
        },
        [searchTermState]
    )


    return <>

        <button onClick={() => navigate("/contacts/create")}>Create Contact</button>
            

        <h2>List of Contacts</h2>

        <article className="contacts">
            {
                filteredContacts.map(
                    (contact) => {
                        return <section className="contact" key={`contact--${contact.id}`}>
                            <div><Link to={`/contacts/${contact.id}`}>{contact.firstName} {contact.lastName ? `${contact.lastName}` : ""}</Link></div>
                            <div>{contact.metAt ? `Met at: ${contact.metAt}` : ""}</div>
                            <div>{contact.email ? `Email: ${contact.email}` : ""}</div>
                            <div>{contact.phone ? `Phone: ${contact.phone}` : ""}</div>
                           
                        </section>
                    }
                )
            }    
            
        </article>    

        </>
}