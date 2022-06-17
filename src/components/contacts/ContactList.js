import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserContacts } from "../APIManager"
import "./Contacts.css"

export const ContactList = ({searchTermState}) => {
    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    const navigate = useNavigate()
    const [sortOption, setSort] = useState({
        sort: ""
    })

    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)

    useEffect(
        () => {
            getUserContacts(connectUserObject.id)
                .then((contactArray) => {
                    setContacts(contactArray)
                    setFilteredContacts(contactArray)
                }) 
        },
        [] 
    )
    
    useEffect(
        () => {
            const contactsCopy = contacts.map(contact => ({...contact}))
            const parameter = sortOption
            const sortedContacts = contactsCopy.sort((a,b) => (a[parameter] > b[parameter]) ? 1 : ((b[parameter] > a[parameter]) ? -1 : 0))
            setFilteredContacts(sortedContacts)
        },
        [sortOption]
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

        <h2>List of Contacts</h2>
        <div id="createContactButton">
        <button onClick={() => navigate("/contacts/create")}>Create New Contact</button>
        </div>

        <div className="sortDropdown">
        <label>
            Sort by:
            <select value={sortOption} onChange={(event) => {
                setSort(event.target.value)
                }}>
                <option value="dateCreated">Date Added</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="birthday">Birthday</option>
                {/* Add category logic later */}
                {/* <option value="category">Category</option> */}
                <option value="metAt">Met At</option>
            </select>
        </label>
        </div>

        <article className="contacts">
            {
                filteredContacts?.map(
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