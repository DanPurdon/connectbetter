import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserContacts } from "../managers/ContactManager"
import "./Contacts.css"

export const ContactList = ({searchTermState, chosenFilterCategoryState}) => {
    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    const [filteredByCategoryContacts, setFilteredByCategoryContacts] = useState([])
    const [sortedContacts, setSortedContacts] = useState([])
    const [displayContacts, setDisplayContacts] = useState([])
    const [sortOption, setSort] = useState({
        sort: ""
    })
    
    const navigate = useNavigate()
    const localConnectUser = localStorage.getItem("connect_token")
    
    useEffect(
        () => {
            getUserContacts(localConnectUser)
                .then((contactArray) => {
                    setContacts(contactArray)
                    setFilteredContacts(contactArray)
                    setSortedContacts(contactArray)
                    setFilteredByCategoryContacts(contactArray)
                    setDisplayContacts(contactArray)
                }) 
        },
        [] 
    )
    
    useEffect(
        () => {
            const contactsCopy = contacts.map(contact => ({...contact}))
            const parameter = sortOption
            const filteredForMatches = contactsCopy.filter(contact => contact[parameter] !== "")
            const sorted = filteredForMatches.sort((a,b) => (a[parameter] > b[parameter]) ? 1 : ((b[parameter] > a[parameter]) ? -1 : 0))
            setSortedContacts(sorted)
            setDisplayContacts(sorted)
        },
        [sortOption]
    )

    useEffect(
        () => {
            let filtered = []
            const input = searchTermState.toLowerCase()
            if (input) {
                if (chosenFilterCategoryState.size > 0) {
                    filtered = filteredByCategoryContacts.filter((el) => {
                        return Object.values(el).some((val) =>
                            String(val).toLowerCase().includes(input)
                        )
                        })
                        setDisplayContacts(filtered)    
                } else {
                filtered = sortedContacts.filter((el) => {
                    return Object.values(el).some((val) =>
                        String(val).toLowerCase().includes(input)
                    )
                    })
                    setDisplayContacts(filtered)
                }
            } else if (chosenFilterCategoryState.size > 0) {
                setDisplayContacts(filteredByCategoryContacts)
            } else {
                setDisplayContacts(sortedContacts)
            }
            
        },
        [searchTermState]
    )

    useEffect(
        () => {
            
            if (chosenFilterCategoryState.size > 0) {
                let categorySet = new Set(chosenFilterCategoryState)
                const matches = sortedContacts.filter(contact => {
                    let categoryMatches = contact.categories.find(contactCategory => {
                        let categoryId = contactCategory.id 
                        return categorySet.has(categoryId)
                    })
                    return categoryMatches ? true : false                    
                })
                setFilteredByCategoryContacts(matches)
                setDisplayContacts(matches)
            } else {
                setDisplayContacts(sortedContacts)
            }
            
        },
        [chosenFilterCategoryState]
    )

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

        <article className="contacts">
            {
                displayContacts?.map(
                    (contact) => {
                        return <>
                            
                            <section className="contact" key={`contact--${contact.id}`} >
                            <Link className="fill__section" to={`/contacts/${contact.id}`}>{contact.first_name} {contact.last_name ? `${contact.last_name}` : ""}
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