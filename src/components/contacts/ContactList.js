import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getContacts } from "../APIManager"
import "./Contacts.css"

export const ContactList = ({searchTermState}) => {
    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    // const [highPrice, setHighPrice] = useState(false)
    // const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()


    

    useEffect(
        () => {
            getContacts()
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
                return contact.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredContacts(searchedContacts)
        },
        [searchTermState]
    )


    return <>

        <button onClick={() => navigate("/contact/create")}>Create Contact</button>
            

        <h2>List of Contacts</h2>

        <article className="contacts">
            {
                filteredContacts.map(
                    (contact) => {
                        return <section className="contact" key={`contact--${contact.id}`}>
                            <header>Name: {contact.name}</header>
                            <div>{contact.name ? `Name: ${contact.name}` : ""}</div>
                            <div>{contact.metAt ? `Met at: ${contact.metAt}` : ""}</div>
                            <div>{contact.birthday ? `Birthday: ${contact.birthday}` : ""}</div>
                            <footer>Notes: {contact.notes} </footer>
                        </section>
                    }
                )
            }    
            
        </article>    

        </>
}