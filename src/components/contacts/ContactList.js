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
            const filteredForMatches = contactsCopy.filter(contact => contact[parameter] !== "")
            const sortedContacts = filteredForMatches.sort((a,b) => (a[parameter] > b[parameter]) ? 1 : ((b[parameter] > a[parameter]) ? -1 : 0))
            setFilteredContacts(sortedContacts)
        },
        [sortOption]
    )

    // useEffect(
    //     () => {
    //         const searchedContacts = contacts.filter(contact => {
    //             return contact.firstName.toLowerCase().startsWith(searchTermState.toLowerCase())
    //         })
    //         setFilteredContacts(searchedContacts)
    //     },
    //     [searchTermState]
    // )

    useEffect(
        () => {
            let filtered = []
            const input = searchTermState.toLowerCase()
            if (input) {
                filtered = contacts.filter((el) => {
                    return Object.values(el).some((val) =>
                        String(val).toLowerCase().includes(input)
                    )
                    })
            
                    // log.textContent = JSON.stringify(filtered);
                    setFilteredContacts(filtered)
            }
            
        },
        [searchTermState]
        )
        
    // const log = document.getElementById('log');
        
    // function searchArray(e) {
    // const input = e.target.value.toLowerCase();
    // if (input) {
    //     filtered = data.filter((el) => {
    //     return Object.values(el).some((val) =>
    //         String(val).toLowerCase().includes(input)
    //     );
    //     });

    //     log.textContent = JSON.stringify(filtered);
    // }
    // }



    const onClick = (contactId) => {
        // debugger
        navigate(`/contacts/${contactId}`)
    }

    return <>

        <div className="sortDropdown">
        <label className="sortLabel">
            Sort by: 
            <select value={sortOption} onChange={(event) => {
                setSort(event.target.value)
                }}>
                <option value="dateCreated">Date Added</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="birthday">Birthday</option>
                <option value="metAt">Met At</option>
                <option value="city">City</option>
            </select>
        </label>
        </div>

        {/* <div id="createContactButton">
        <button onClick={() => navigate("/contacts/create")}>Create New Contact</button>
        </div> */}
        
        <article className="contacts">
            {
                filteredContacts?.map(
                    (contact) => {
                        return <>
                            
                            <section className="contact" key={`contact--${contact.id}`} >
                            <Link className="fill__section" to={`/contacts/${contact.id}`}>{contact.firstName} {contact.lastName ? `${contact.lastName}` : ""}
                            {/* <div onclick={navigate(`/contacts/${contact.id}`)} style="cursor: pointer;">  onclick={navigate(`/contacts/${contact.id}`)} onClick={onClick(contact.id)} style={{ cursor: "pointer" }}*/ }
                            <div>
                            <div>{contact.metAt ? `Met at: ${contact.metAt}` : ""}</div>
                            <div>{contact.email ? `Email: ${contact.email}` : ""}</div>
                            <div>{contact.phone ? `Phone: ${contact.phone}` : ""}</div>
                            <div>{sortOption === "birthday" ? `Birthday: ${contact.birthday}` : ""}</div>
                            <div>{sortOption === "city" ? `City: ${contact.city}` : ""}</div>
                            </div>
                            </Link>
                        </section>
                        </>
                    }
                )
            }    
            
        </article>    

        </>
}